export default (content) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>React Best App by Vika</title>
        <link rel="stylesheet" href="index.css" />
      </head>
      
      <body>
        <div id="root">${content}</div>
         <script src="bundle-server.js"></script>
      </body>     
     
    </html>
  `;
};