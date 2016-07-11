import TicketUtils from './TicketUtils.jsx';
let FileQuery = function FileQuery(itemId, files) {
  console.debug(itemId);
  this.query = {
    Files: files,
    ItemId: itemId
  };
  const queryProduct = '/POS/Purchases/UploadPDF';
  return new TicketUtils.Query('POST', queryProduct, this.query);
};

export default FileQuery;
