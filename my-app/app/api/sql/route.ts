import { NextRequest, NextResponse } from 'next/server';
import sequelize from '@/lib/db'; // make sure this is correctly configured
import { QueryTypes } from 'sequelize';

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    console.log('⏳ Incoming SQL query:', query);

    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'Invalid SQL query' }, { status: 400 });
    }

    // 🚫 Optional: Reject dangerous queries (e.g., DROP, DELETE)
    const lowered = query.toLowerCase();
    if (
      lowered.includes('drop') ||
      lowered.includes('delete') ||
      lowered.includes('truncate') ||
      lowered.includes('alter')
    ) {
      return NextResponse.json(
        { error: 'Query contains restricted keywords.' },
        { status: 400 }
      );
    }

    // ✅ Execute the query
    const results = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });

    return NextResponse.json(results, { status: 200 });
  } catch (error: any) {
    console.error('❌ SQL execution error:', error);
    return NextResponse.json(
      { error: 'Error executing SQL', message: error.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
//   }
//   }