function postSheetDataToWebhook() {
    const sheetName = 'Sheet1'; // Replace with your sheet name
    const approvedColumn = 'I'; // Replace with the column letter of the "approved" column
    const webhookUrl = 'https://9693-197-210-53-223.eu.ngrok.io/webhook'; // Replace with your webhook URL
  
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    const dataRange = sheet.getDataRange();
    const dataValues = dataRange.getValues();
  
    const headers = dataValues.shift();
    const approvedColumnIndex = headers.indexOf('accepted_answer_id (text)');
    const rowIdColumnIndex = headers.indexOf('id (text)');
  
    const approvedRows = PropertiesService.getScriptProperties().getProperty('approvedRows');
    let approvedRowIds = approvedRows ? JSON.parse(approvedRows) : [];
  
    // Filter out rows where the "approved" column is not checked, and where the row ID is not in the approvedRows list
    const filteredData = dataValues.filter(row => {
      const rowId = row[rowIdColumnIndex];
      const alreadyApproved = approvedRowIds.indexOf(rowId) !== -1;
      const approved = row[approvedColumnIndex] === 'Yes';
      return approved && !alreadyApproved;
    });
  
    // Convert the data to the expected format for the webhook
    const postData = filteredData.map(row => {
      const data = {};
      headers.forEach((header, index) => {
        data[header] = row[index];
      });
      return data;
    });
  
    // Combine all objects in the postData array into a single object
    const postObject = {};
    postData.forEach(data => {
      Object.keys(data).forEach(key => {
        postObject[key] = data[key];
      });
    });
  
    // Convert the postObject to a single string
    const postDataString = JSON.stringify(postObject);
  
    // Post the data to the webhook
    const options = {
      method: 'post',
      contentType: 'application/json',
      payload: postDataString,
      // muteHttpExceptions: true
    };
    UrlFetchApp.fetch(webhookUrl, options);
  
    // Update the approvedRows list with the row IDs of the newly approved rows
    const newApprovedRowIds = filteredData.map(row => row[rowIdColumnIndex]);
    approvedRowIds = approvedRowIds.concat(newApprovedRowIds);
    PropertiesService.getScriptProperties().setProperty('approvedRows', JSON.stringify(approvedRowIds));
  }
  