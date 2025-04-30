const axios = require('axios');

// Replace these with your actual Airtable credentials
const AIRTABLE_API_KEY = 'patA7ktb5ScngPCSO.36c986421cabe87715332daa98f317216b26f80eb54a5bfa8423a70390dd5958';
const BASE_ID = 'appNBZtxwteZYohEj';

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
        name: 'Shade Recommendations V2',
        description: 'Survey responses and shade recommendations with individual question columns',
        fields: [
          {
            name: 'Record ID',
            type: 'singleLineText',
            description: 'Unique identifier for the record'
          },
          {
            name: 'Natural Hair Color',
            type: 'singleSelect',
            options: {
              choices: [
                { name: 'Black' },
                { name: 'Dark Brown' },
                { name: 'Light Brown' },
                { name: 'Blonde' },
                { name: 'Red' }
              ]
            }
          },
          {
            name: 'Climate',
            type: 'singleSelect',
            options: {
              choices: [
                { name: 'Dry' },
                { name: 'Normal' },
                { name: 'Humid' }
              ]
            }
          },
          {
            name: 'Skin Type',
            type: 'singleSelect',
            options: {
              choices: [
                { name: 'Dry' },
                { name: 'Normal' },
                { name: 'Oily' },
                { name: 'Combination' }
              ]
            }
          },
          {
            name: 'Redness',
            type: 'singleSelect',
            options: {
              choices: [
                { name: 'Yes' },
                { name: 'No' }
              ]
            }
          },
          {
            name: 'Summer Darkening',
            type: 'singleSelect',
            options: {
              choices: [
                { name: 'Significantly' },
                { name: 'Somewhat' },
                { name: 'Barely' }
              ]
            }
          },
          {
            name: 'Desired Coverage',
            type: 'singleSelect',
            options: {
              choices: [
                { name: 'Full' },
                { name: 'Medium' },
                { name: 'Light' }
              ]
            }
          },
          {
            name: 'Jewelry Preference',
            type: 'singleSelect',
            options: {
              choices: [
                { name: 'Gold' },
                { name: 'Silver' },
                { name: 'Both' }
              ]
            }
          },
          {
            name: 'Vein Color',
            type: 'singleSelect',
            options: {
              choices: [
                { name: 'Green' },
                { name: 'Blue' },
                { name: 'Both' }
              ]
            }
          },
          {
            name: 'Foundation Issues',
            type: 'singleSelect',
            options: {
              choices: [
                { name: 'Too Orange' },
                { name: 'Too Pink' },
                { name: 'Too Light' },
                { name: 'Too Dark' },
                { name: 'None' }
              ]
            }
          },
          {
            name: 'Makeup Look',
            type: 'singleSelect',
            options: {
              choices: [
                { name: 'Natural' },
                { name: 'Glam' },
                { name: 'Matte' }
              ]
            }
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
                { name: 'Pro Filtr' },
                { name: 'Eaze Drop' },
                { name: 'Soft Lit' }
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
              timeFormat: { name: '24hour' },
              timeZone: 'client'
            }
          }
        ]
      }
    });

    console.log('Table created successfully:', response.data);
  } catch (error) {
    if (error.response) {
      console.error('Error creating table:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
    process.exit(1);
  }
}

// Run the script
createTable(); 