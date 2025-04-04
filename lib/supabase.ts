import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Constants for pagination
export const ITEMS_PER_PAGE = 20

console.log('Supabase URL:', supabaseUrl)
console.log('Initializing Supabase client...')

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

// Function to fetch schools with pagination
export async function fetchSchools(page: number = 1): Promise<PaginatedResponse<School>> {
  console.log('Fetching schools page:', page)
  try {
    // First get total count for pagination
    const { count: totalCount } = await supabase
      .from('schools')
      .select('*', { count: 'exact', head: true })

    // Calculate pagination values
    const from = (page - 1) * ITEMS_PER_PAGE
    const to = from + ITEMS_PER_PAGE - 1

    // Fetch paginated data
    const { data, error } = await supabase
      .from('schools')
      .select('*')
      .range(from, to)
      .order('ID', { ascending: true })
    
    if (error) {
      console.error('Error fetching schools:', error)
      console.error('Full error details:', JSON.stringify(error, null, 2))
      throw error
    }
    
    console.log(`Fetched ${data?.length || 0} schools for page ${page}`)
    
    // Calculate if there are more pages
    const hasMore = totalCount ? from + ITEMS_PER_PAGE < totalCount : false
    const nextPage = hasMore ? page + 1 : null

    return {
      data: data || [],
      count: totalCount || 0,
      hasMore,
      nextPage
    }
  } catch (err) {
    console.error('Exception while fetching schools:', err)
    console.error('Full error details:', err instanceof Error ? err.stack : err)
    throw err
  }
}

// Function to fetch schools with filters and pagination
export async function fetchSchoolsWithFilters(
  filters: Partial<School>,
  page: number = 1
): Promise<PaginatedResponse<School>> {
  try {
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

    // Calculate pagination values
    const from = (page - 1) * ITEMS_PER_PAGE
    const to = from + ITEMS_PER_PAGE - 1

    // Build data query
    let query = supabase
      .from('schools')
      .select('*')
      .range(from, to)
      .order('ID', { ascending: true })

    // Add filters to data query
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        query = query.eq(key, value)
      }
    })

    // Fetch filtered and paginated data
    const { data, error } = await query

    if (error) {
      console.error('Error fetching filtered schools:', error)
      console.error('Full error details:', JSON.stringify(error, null, 2))
      throw error
    }

    // Calculate if there are more pages
    const hasMore = totalCount ? from + ITEMS_PER_PAGE < totalCount : false
    const nextPage = hasMore ? page + 1 : null

    return {
      data: data || [],
      count: totalCount || 0,
      hasMore,
      nextPage
    }
  } catch (err) {
    console.error('Error in fetchSchoolsWithFilters:', err)
    throw err
  }
} 