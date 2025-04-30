import axios, { AxiosError } from 'axios';

const AIRTABLE_API_KEY = 'patA7ktb5ScngPCSO.36c986421cabe87715332daa98f317216b26f80eb54a5bfa8423a70390dd5958';
const BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;

if (!BASE_ID) {
  console.error('Error: NEXT_PUBLIC_AIRTABLE_BASE_ID is not set in .env.local');
  process.exit(1);
}

async function createTable() {
  try {
    const response = await axios({
      method: 'post',
      url: `https://api.airtable.com/v0/meta/bases/${BASE_ID}/tables`,
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      data: {
        name: 'Shade Recommendations',
        description: 'Survey responses and shade recommendations',
        fields: [
          {
            name: 'Survey Answers',
            type: 'multilineText',
            description: 'Full survey questions and answers'
          },
          {
            name: 'Recommended Shade',
            type: 'singleLineText',
            description: 'The recommended Fenty shade number'
          },
          {
            name: 'Undertone',
            type: 'singleSelect',
            options: {
              choices: [
                { name: 'Cool' },
                { name: 'Warm' },
                { name: 'Neutral' }
              ]
            }
          },
          {
            name: 'Skin Depth',
            type: 'singleSelect',
            options: {
              choices: [
                { name: 'LIGHT-MEDIUM' },
                { name: 'MEDIUM-DEEP' }
              ]
            }
          },
          {
            name: 'Formula Type',
            type: 'singleSelect',
            options: {
              choices: [
                { name: 'moisturizing' },
                { name: 'oil-control' },
                { name: 'adaptive' }
              ]
            }
          },
          {
            name: 'Feedback',
            type: 'singleSelect',
            options: {
              choices: [
                { name: 'yes' },
                { name: 'somewhat' },
                { name: 'no' }
              ]
            }
          },
          {
            name: 'Created At',
            type: 'dateTime',
            options: {
              dateFormat: { name: 'iso' },
              timeFormat: { name: '24hour' }
            }
          }
        ]
      }
    });

    console.log('Table created successfully:', response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error creating table:', error.response?.data || error.message);
    } else {
      console.error('Error creating table:', error);
    }
    process.exit(1);
  }
}

// First install required dependency
console.log('Installing axios...');
require('child_process').execSync('npm install axios', { stdio: 'inherit' });

// Then create the table
createTable(); 