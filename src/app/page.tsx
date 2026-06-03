import { supabase } from "@/lib/supabase";
import { Course } from "@/types/course";
import DashboardClient from "@/components/DashboardClient";

// Disable static rendering so data is fetched live from Supabase
export const revalidate = 0;

async function getCourses(): Promise<Course[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes("placeholder-url")) {
    throw new Error(
      "Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY) are not configured. Please create a .env.local file with your credentials."
    );
  }

  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      throw new Error(
        "No course records found in the 'courses' database table. Please run the SQL queries inside 'supabase_schema.sql' in your Supabase SQL Editor to seed the sample data."
      );
    }

    return data as Course[];
  } catch (err: any) {
    console.error("Error encountered in getCourses server call:", err);
    throw new Error(
      `Database connection failed: ${err.message || "Failed to query database table."}`
    );
  }
}

export default async function Page() {
  const courses = await getCourses();

  return <DashboardClient initialCourses={courses} />;
}
