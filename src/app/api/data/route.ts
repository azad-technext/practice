import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/database';

export async function GET() {
  try {
    const result = await query('SELECT * FROM name_data ORDER BY id ASC;');
    return NextResponse.json({ success: true, data: result.rows });
  } catch (err) {
    console.error('Database error in getAllData:', (err as Error).message);
    return NextResponse.json(
      { error: 'Database operation failed', details: (err as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();
    
    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    console.log(name);
    const queryText = 'INSERT INTO name_data (name) VALUES($1) RETURNING *;';
    console.log('Executing query:', queryText, 'with params:', [name]);
    
    const result = await query(queryText, [name]);
    
    return NextResponse.json(
      { success: true, message: 'Item created', data: result.rows[0] },
      { status: 201 }
    );
  } catch (err) {
    console.error('Database error in createItem:', (err as Error).message);
    return NextResponse.json(
      { error: 'Database operation failed', details: (err as Error).message },
      { status: 500 }
    );
  }
}
