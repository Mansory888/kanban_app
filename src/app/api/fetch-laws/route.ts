import { NextResponse } from 'next/server';

const API_URL = process.env.API_URL;

export async function GET() {
  const query = `$filter=(typeid eq 3 or typeid eq 5 or typeid eq 9) and periodeid eq 160`;

  try {
    console.log('Fetching from URL:', `${API_URL}?${query}`);
    const response = await fetch(`${API_URL}?${query}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}