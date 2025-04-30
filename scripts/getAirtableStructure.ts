import Airtable from 'airtable';

const airtable = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY
});

const base = airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || '');

async function getTableStructure() {
  try {
    const table = base('Shade Recommendations');
    const records = await table.select({
      maxRecords: 1,
      view: 'Grid view'
    }).firstPage();

    if (records.length > 0) {
      console.log('Table Fields:', Object.keys(records[0].fields));
    } else {
      console.log('No records found in the table');
    }
  } catch (error) {
    console.error('Error fetching table structure:', error);
  }
}

getTableStructure(); 