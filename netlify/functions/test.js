exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ 
      message: "Netlify functions are working!",
      timestamp: new Date().toISOString(),
      path: event.path
    })
  };
};
