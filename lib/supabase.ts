import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Constants for pagination
export const ITEMS_PER_PAGE = 20
const MAX_SEARCH_LENGTH = 100
const MIN_SEARCH_LENGTH = 3
const RATE_LIMIT_REQUESTS = 100
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute

// console.log('Supabase URL:', supabaseUrl)
console.log('Initializing Supabase client...')

// Custom error types
export class SchoolSearchError extends Error {
  constructor(message: string, public code: string) {
    super(message)
    this.name = 'SchoolSearchError'
  }
}

// Rate limiting
const requestCounts = new Map<string, number>()
const requestTimestamps = new Map<string, number[]>()

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type for the schools table
export interface School {
  ID: string
  NEGERI: string
  PPD: string
  PUSAT: string
  SEMESTER: string
  BIDANG: string
  PAKEJ_MATA_PELAJARAN: string
}

// Type for paginated response
export interface PaginatedResponse<T> {
  data: T[]
  count: number
  hasMore: boolean
  nextPage: number | null
}

// Type for cursor-based pagination
export interface CursorPaginatedResponse<T> {
  data: T[]
  count: number
  hasMore: boolean
  nextCursor?: string
  prevCursor?: string
}

// Utility functions
function sanitizeSearchQuery(query: string): string {
  if (!query) return ''
  
  // Remove SQL injection risks
  const sanitized = query
    .slice(0, MAX_SEARCH_LENGTH)
    .replace(/[%;]/g, '')
    .trim()
  
  if (sanitized.length < MIN_SEARCH_LENGTH) {
    throw new SchoolSearchError(
      `Search query must be at least ${MIN_SEARCH_LENGTH} characters`,
      'INVALID_QUERY_LENGTH'
    )
  }
  
  return sanitized
}

function checkRateLimit(clientId: string): void {
  const now = Date.now()
  const timestamps = requestTimestamps.get(clientId) || []
  
  // Remove old timestamps
  const recentTimestamps = timestamps.filter(
    timestamp => now - timestamp < RATE_LIMIT_WINDOW
  )
  
  if (recentTimestamps.length >= RATE_LIMIT_REQUESTS) {
    throw new SchoolSearchError(
      'Rate limit exceeded. Please try again later.',
      'RATE_LIMIT_EXCEEDED'
    )
  }
  
  // Update timestamps
  recentTimestamps.push(now)
  requestTimestamps.set(clientId, recentTimestamps)
}

// Function to fetch schools with pagination
export async function fetchSchools(
  cursor?: string,
  clientId: string = 'default'
): Promise<CursorPaginatedResponse<School>> {
  console.log('Fetching schools with cursor:', cursor)
  try {
    // Check rate limit
    checkRateLimit(clientId)

    // First get total count for pagination
    const { count: totalCount } = await supabase
      .from('schools')
      .select('*', { count: 'exact', head: true })

    // Build query with cursor pagination
    let query = supabase
      .from('schools')
      .select('*')
      .order('ID', { ascending: true })
      .limit(ITEMS_PER_PAGE)

    // Apply cursor if provided
    if (cursor) {
      query = query.gt('ID', cursor)
    }

    const { data, error } = await query
    
    if (error) {
      console.error('Error fetching schools:', error)
      console.error('Full error details:', JSON.stringify(error, null, 2))
      throw new SchoolSearchError('Failed to fetch schools', 'FETCH_ERROR')
    }
    
    console.log(`Fetched ${data?.length || 0} schools`)
    
    // Get cursors for pagination
    const nextCursor = data && data.length === ITEMS_PER_PAGE ? data[data.length - 1].ID : undefined
    const prevCursor = data && data.length > 0 ? data[0].ID : undefined

    return {
      data: data || [],
      count: totalCount || 0,
      hasMore: !!nextCursor,
      nextCursor,
      prevCursor
    }
  } catch (err) {
    if (err instanceof SchoolSearchError) {
      throw err
    }
    console.error('Exception while fetching schools:', err)
    throw new SchoolSearchError('An unexpected error occurred', 'UNKNOWN_ERROR')
  }
}

// Function to fetch schools with filters and pagination
export async function fetchSchoolsWithFilters(
  filters: Partial<School>,
  cursor?: string,
  clientId: string = 'default'
): Promise<CursorPaginatedResponse<School>> {
  try {
    // Check rate limit
    checkRateLimit(clientId)

    // Build base query for counting
    let countQuery = supabase
      .from('schools')
      .select('*', { count: 'exact', head: true })

    // Add filters to count query
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        countQuery = countQuery.eq(key, value)
      }
    })

    // Get total count with filters
    const { count: totalCount } = await countQuery

    // Build data query with cursor pagination
    let query = supabase
      .from('schools')
      .select('*')
      .order('ID', { ascending: true })
      .limit(ITEMS_PER_PAGE)

    // Add filters to data query
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        query = query.eq(key, value)
      }
    })

    // Apply cursor if provided
    if (cursor) {
      query = query.gt('ID', cursor)
    }

    // Fetch filtered and paginated data
    const { data, error } = await query

    if (error) {
      console.error('Error fetching filtered schools:', error)
      throw new SchoolSearchError('Failed to fetch filtered schools', 'FILTER_ERROR')
    }

    // Get cursors for pagination
    const nextCursor = data && data.length === ITEMS_PER_PAGE ? data[data.length - 1].ID : undefined
    const prevCursor = data && data.length > 0 ? data[0].ID : undefined

    return {
      data: data || [],
      count: totalCount || 0,
      hasMore: !!nextCursor,
      nextCursor,
      prevCursor
    }
  } catch (err) {
    if (err instanceof SchoolSearchError) {
      throw err
    }
    console.error('Error in fetchSchoolsWithFilters:', err)
    throw new SchoolSearchError('An unexpected error occurred', 'UNKNOWN_ERROR')
  }
}

// Function to search schools with text query
export async function searchSchools(
  searchQuery: string,
  cursor?: string,
  clientId: string = 'default'
): Promise<CursorPaginatedResponse<School>> {
  try {
    // Check rate limit
    checkRateLimit(clientId)

    // Sanitize input
    const sanitizedQuery = sanitizeSearchQuery(searchQuery)
    if (!sanitizedQuery) {
      return fetchSchools()
    }

    // Build base query for counting with search
    let countQuery = supabase
      .from('schools')
      .select('*', { count: 'exact', head: true })
      .or(`NEGERI.ilike.%${sanitizedQuery}%,PPD.ilike.%${sanitizedQuery}%,PUSAT.ilike.%${sanitizedQuery}%`)

    // Get total count with search
    const { count: totalCount } = await countQuery

    // Build data query with search and cursor
    let query = supabase
      .from('schools')
      .select('*')
      .or(`NEGERI.ilike.%${sanitizedQuery}%,PPD.ilike.%${sanitizedQuery}%,PUSAT.ilike.%${sanitizedQuery}%`)
      .order('ID', { ascending: true })
      .limit(ITEMS_PER_PAGE)

    // Apply cursor if provided
    if (cursor) {
      query = query.gt('ID', cursor)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error searching schools:', error)
      throw new SchoolSearchError(
        'Failed to search schools',
        'SEARCH_ERROR'
      )
    }

    // Get cursors for pagination
    const nextCursor = data && data.length === ITEMS_PER_PAGE ? data[data.length - 1].ID : undefined
    const prevCursor = data && data.length > 0 ? data[0].ID : undefined

    return {
      data: data || [],
      count: totalCount || 0,
      hasMore: !!nextCursor,
      nextCursor,
      prevCursor
    }
  } catch (err) {
    if (err instanceof SchoolSearchError) {
      throw err
    }
    console.error('Error in searchSchools:', err)
    throw new SchoolSearchError(
      'An unexpected error occurred',
      'UNKNOWN_ERROR'
    )
  }
} 