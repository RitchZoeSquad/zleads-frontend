import Papa from "papaparse"

const exportLeads=async(val)=>{

if(val.typeOfSearch==="withWebsite"){

    const flatData = val.data.map(item => {
      const details = item.lead?item.lead :item;
      const sources = details?.sources?.map(source => source?.uri).join(', ');
      return {
        Email: details.email,
        Website: details.website_url,
        AcceptAll: details.accept_all ? 'Yes' : 'No',
        FirstName: details.first_name || '',
        LastName: details.last_name || '',
        Country: details.country || '',
        Gender: details.gender || '',
        PhoneNumber: details?.phone_number===true?details?.phoneInfo?.intl_format: '',
        PhoneNumber_line_type: details?.phone_number===true?details?.phoneInfo?.line_type: '',
        Position: details.position || '',
        Twitter: details.twitter || '',
        LinkedIn: details.linkedin || '',
        Disposable: details.disposable ? 'Yes' : 'No',
        Webmail: details.webmail ? 'Yes' : 'No',
        FullName: details.full_name || '',
        Company: details.company || '',
        Score: details.score || '',
        VerificationDate: details.verification ? details.verification.date || '' : '',
        VerificationStatus: details.verification ? details.verification.status || '' : '',
        Sources: sources
      };
    });

    // Define CSV fields
    const csvFields = [
      'Email',
      'Website',
      'AcceptAll',
      'FirstName',
      'LastName',
      'Country',
      'Gender',
      'PhoneNumber',
      'PhoneNumber_line_type',
      'Position',
      'Twitter',
      'LinkedIn',
      'Disposable',
      'Webmail',
      'FullName',
      'Company',
      'Score',
      'VerificationDate',
      'VerificationStatus',
      'Sources'
    ];

    // Convert the data to CSV format using PapaParse
    const csvData = Papa.unparse({
      fields: csvFields,
      data: flatData
    });

    // Create a Blob and download the CSV file
    const csvBlob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const csvUrl = URL.createObjectURL(csvBlob);
    const a = document.createElement('a');
    a.href = csvUrl;
    a.download = 'FoundLeadsData.csv';
    a.click();
    URL.revokeObjectURL(csvUrl);
}
 else{
  const flatData = val.data.map(item => {
    return {
      Query: item.query,
      Name: item.name,
      PlaceId: item.place_id,
      GoogleId: item.google_id,
      FullAddress: item.full_address,
      Borough: item.borough,
      Street: item.street,
      PostalCode: item.postal_code,
      AreaService: item.area_service ? 'Yes' : 'No',
      CountryCode: item.country_code,
      Country: item.country,
      City: item.city,
      USState: item.us_state,
      State: item.state,
      Latitude: item.latitude,
      Longitude: item.longitude,
      TimeZone: item.time_zone,
      Site: item.site,
      Phone: item.phone,
      Type: item.type,
      Logo: item.logo,
      Description: item.description,
      Category: item.category,
      Subtypes: item.subtypes,
      Rating: item.rating || '',
      Reviews: item.reviews || '',
      PhotosCount: item.photos_count || '',
      Cid: item.cid || '',
      WorkingHours: JSON.stringify(item.working_hours || {}),
      BusinessStatus: item.business_status || '',
      Verified: item.verified ? 'Yes' : 'No',
      OwnerTitle: item.owner_title || '',
      OwnerLink: item.owner_link || '',
      LocationLink: item.location_link || '',
      Cid: item.cid || '',
      ReviewId: item.reviews_id || ''
    };
  });

  const csvFields = [
    'Query',
    'Name',
    'PlaceId',
    'GoogleId',
    'FullAddress',
    'Borough',
    'Street',
    'PostalCode',
    'AreaService',
    'CountryCode',
    'Country',
    'City',
    'USState',
    'State',
    'Latitude',
    'Longitude',
    'TimeZone',
    'Site',
    'Phone',
    'Type',
    'Logo',
    'Description',
    'Category',
    'Subtypes',
    'Rating',
    'Reviews',
    'PhotosCount',
    'Cid',
    'WorkingHours',
    'BusinessStatus',
    'Verified',
    'OwnerTitle',
    'OwnerLink',
    'LocationLink',
    'Cid',
    'ReviewId'
  ];

  const csvData = Papa.unparse({
    fields: csvFields,
    data: flatData
  });

  const csvBlob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  const csvUrl = URL.createObjectURL(csvBlob);
  const a = document.createElement('a');
  a.href = csvUrl;
  a.download = 'foundResultData.csv';
  a.click();
  URL.revokeObjectURL(csvUrl);
 }
  }
  
  const exportDataUsersWithoutWebsiteExcel = async (url) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = 'foundResultData.xlsx';
    a.click();
  }

  const exportVerifiedLeadsData = (data) => {
    if(data!==null && data.length!==0){

      const flatData = data.map((item) => {
        const emailDetails = item.email;
        const sources = item?.sources?.map((source) => source?.uri).join(', ');
        return {
          Email: emailDetails?.email || '',
          MxRecords: emailDetails.mx_records ? 'Yes' : 'No',
          SmtpServer: emailDetails.smtp_server ? 'Yes' : 'No',
          SmtpCheck: emailDetails.smtp_check ? 'Yes' : 'No',
          AcceptAll: emailDetails.accept_all ? 'Yes' : 'No',
          Block: emailDetails.block ? 'Yes' : 'No',
          Gibberish: emailDetails.gibberish ? 'Yes' : 'No',
          Disposable: emailDetails.disposable ? 'Yes' : 'No',
          Webmail: emailDetails.webmail ? 'Yes' : 'No',
          Result: emailDetails?.result || '',
          Score: emailDetails?.score || '',
          Regex: emailDetails.regex ? 'Yes' : 'No',
          WhoisRegistrar: emailDetails.whois ? emailDetails.whois.registrar_name || '' : '',
          WhoisCreatedDate: emailDetails.whois ? emailDetails.whois.created_date || '' : '',
          Status: emailDetails.status || '',
          Sources: sources,
        };
      });
      
      const csvFields = [
        'Email',
        'MxRecords',
        'SmtpServer',
        'SmtpCheck',
        'AcceptAll',
        'Block',
        'Gibberish',
        'Disposable',
        'Webmail',
        'Result',
        'Score',
        'Regex',
        'WhoisRegistrar',
        'WhoisCreatedDate',
        'Status',
        'Sources',
      ];
      
      const csvData = Papa.unparse({
        fields: csvFields,
        data: flatData,
      });
      
      const csvBlob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const csvUrl = URL.createObjectURL(csvBlob);
      const a = document.createElement('a');
      a.href = csvUrl;
      a.download = 'EmailsVerificationData.csv';
      a.click();
      URL.revokeObjectURL(csvUrl);
    }
    };

export {exportLeads,exportVerifiedLeadsData,exportDataUsersWithoutWebsiteExcel}