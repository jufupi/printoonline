import { NextResponse } from 'next/server';

export async function GET() {
  const isPresent = !!process.env.SUPABASE_SERVICE_ROLE_KEY;

  return NextResponse.json({
    SUPABASE_SERVICE_ROLE_KEY: isPresent
  });
}
