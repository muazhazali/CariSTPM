import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

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

// Function to fetch all schools
export async function fetchSchools() {
  console.log('Fetching schools from public schema...')
  try {
    // First, let's check if we can access the database
    const { data: schemaData, error: schemaError } = await supabase
      .from('schools')
      .select('ID')
      .limit(1)
    
    if (schemaError) {
      console.error('Error accessing schools table:', schemaError)
      throw schemaError
    }

    console.log('Successfully connected to schools table')

    // Now fetch all schools
    const { data, error } = await supabase
      .from('schools')
      .select('*')
    
    if (error) {
      console.error('Error fetching schools:', error)
      throw error
    }
    
    console.log('Schools fetched successfully:', data?.length || 0, 'schools found')
    if (data?.length === 0) {
      console.log('Warning: No schools found in the database')
    }
    return data
  } catch (err) {
    console.error('Exception while fetching schools:', err)
    throw err
  }
}

// Function to fetch schools with filters
export async function fetchSchoolsWithFilters(filters: Partial<School>) {
  let query = supabase.from('schools').select('*')

  // Add filters if they exist
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      query = query.eq(key, value)
    }
  })

  const { data, error } = await query

  if (error) {
    console.error('Error fetching schools with filters:', error)
    throw error
  }

  return data
} 