import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  return NextResponse.json({ error: 'Contact form submissions are not supported.' }, { status: 403 });
}
