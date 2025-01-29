const fs = require('fs');
const path = require('path');

// File path for lessons.js
const filePath = path.join(__dirname, 'lessons.js');

// Read the content of lessons.js
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    // Extract the initial RAW_LESSONS array declaration
    const rawLessonsMatch = data.match(/const RAW_LESSONS = \[(.*?)\];/s);
    let rawLessonsArray = rawLessonsMatch ? rawLessonsMatch[1].trim() : '';

    // Extract all RAW_LESSONS.push({...}) additions
    const pushMatches = [...data.matchAll(/RAW_LESSONS\.push\((\{.*?\})\);/gs)];
    const additionalLessons = pushMatches.map(match => match[1].trim());

    // Merge all lessons into one large array
    const consolidatedLessons = `[${rawLessonsArray}${rawLessonsArray && additionalLessons.length ? ',' : ''}${additionalLessons.join(',')}]`;

    // Replace original declarations in the file
    let newData = data
        .replace(/const RAW_LESSONS = \[(.*?)\];/s, `const RAW_LESSONS = ${consolidatedLessons};`)
        .replace(/RAW_LESSONS\.push\(\{.*?\}\);\n?/gs, ''); // Remove RAW_LESSONS.push lines

    // Write the cleaned-up content back to lessons.js
    fs.writeFile(filePath, newData, 'utf8', (writeErr) => {
        if (writeErr) {
            console.error('Error writing file:', writeErr);
        } else {
            console.log('Successfully consolidated RAW_LESSONS into a single array.');
        }
    });
});