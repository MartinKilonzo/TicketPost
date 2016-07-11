import TicketUtils from './TicketUtils.jsx';
let Ticket = function Ticket(ticketPost) {
  this.Event = ticketPost.event.Name;
  this.EventDate = ticketPost.event.Date;
  this.Venue = 'Rogers Centre';
  this.Section = ticketPost.section;
  this.Row = ticketPost.row;
  this.Quantity = ticketPost.count;
  this.LowSeat = ticketPost.start;
  this.TicketType = 1; //Standard = 1, Piggyback = 2 (NOT SUPPORTED VIA API), Parking = 3, Suite = 4
  this.Seating = 3; // OddEven = 1, GA = 2, Consecutive = 3
  this.Stock = 2; // eTicket = 1, StandardToeTicket = 2, , Paperless = 3, FlashSeats = 4, Mobile = 5, StandardToMobile = 6, Standard = 7
  this.TotalPurchasePrice = { // Total purchase price will be divided by number of tickets.
    Amount: 0,
    Currency: 'USD'
  };
  this.FacePrice = { //	Face Price per ticket.
    Amount: 0,
    Currency: 'USD'
  };
  this.PurchasePrice = { // Purchase Price per ticket
    Amount: 100,
    Currency: 'USD'
  };
  this.SellPrice = { // Selling Price per ticket
    Amount: 250,
    Currency: 'USD'
  };
  this.InHand = {
    InHandStatus: 3, // InHandDate = 1, InHandDays = 2, Yes = 3
    InHandDays: 0, // Number of Days before Event. Required if InHandStatus is (2)
    InHandDate: '' //In Hand Date in ISO 8601 Format (Ex. 2013-0621T05:32:07) Required if InHandStatus is (1)
  };
  this.Notes = ''; // Public Note
  this.InternalNotes = 'New Post'; // Private Note
  this.BrokerNotes = ''; // Broker Note
  this.SplitOption = 1; // Splitting options of your tickets: Any = 0, Multiples of = 1, Avoid 1 = 2, No Splits = 3
  this.Splits = 0; // Required if SplitOption is Multiples of (1)
  this.DeliveryOption = 4; // Delivery Option: Standard = 2, eDelivery = 4, Paperless = 32, Flash = 64, Mobile = 128
  this.NearTermDeliveryOption = 4; //NearTerm Delivery Option: eDelivery = 4, WillCall = 8, LocalPickup = 16, Paperless = 32, Flash = 64, Mobile = 128
  this.ReferenceNumber = ''; // Reference Ticket Number
};

let addVendorData = function addVendorData(TicketInventory, ticketPost) {
  TicketInventory.VendorCode = 10; // Other = 0, Charged.Fm = 1, Event Inventory = 2, FanXchange = 3, GetMeIn = 4, LiveNation = 5, Razorgator = 6, SeatGeek = 7, SeatWave = 8, StubHub = 9, TicketMaster = 10, TicketsCom = 11, Ticket Technology = 12, TickPick = 13, Ticket Network = 14, TicketCity = 15, VividSeats = 16, Viagogo = 17, ZigaBid = 18, ScoreBig = 19, Out of ThisWorld Tickets = 20, MinnetonkaTickets = 21, ContenderCom=22, TicketMonster=23, RocketPoster Legacy=24, TicketMasterPlus = 26, GameTime = 27, Rukkus =28, SeatSmart = 29
  TicketInventory.Vendor = { // Either provide vendor code (above) or venor code details
    FirstName: '',
    LastName: '',
    Company: '',
    Email: 'customerservice@ticketmaster.com',
    Address1: '',
    Address2: '',
    Zip: '',
    Country: '',
    State: '',
    City: '',
    Phone: '800-745-3000',
    Cell: ''
  };

  TicketInventory.POType = 1; // PO type of your tickets: Standard = 1, Spec= 2, Consignment= 3
  TicketInventory.Spec = { // Required if POType = 1
    ExpirationType: 1, //PO Expiration type of your tickets: Never = 1, DaysBeforeEvent= 2, OnDate= 3; Required if POType = 1
    ExpirationDate: '', // Expiration Date; Required if POType = 1
    ExpirationDays: 0 // PO Expiration Days; Required if POType = 1
  };
  TicketInventory.Consignment = {
    Operation: 0, // Consign operation of your PO: Amount= 1, Percentage= 2
    Commission: 0 // Consign commission amount or percentage value
  };
  TicketInventory.ExternalOrderNumber = ''; // External Shipping Order Number If any
  TicketInventory.Notes = ''; // Public Note
  TicketInventory.AdditionalCost = {
    Amount: 0, // Additional Cost
    Currency: 'USD' // 3-Letter Currency Code
  };
  TicketInventory.Tax = {
    Amount: 0, // Tax Amount
    Currency: 'USD' // 3-Letter Currency Code
  };
  TicketInventory.ShippingCost = {
    Amount: 0, // Shipping Amount
    Currency: 'USD' // 3-Letter Currency Code
  };
  TicketInventory.IsShippingCostExcluded = false;
  TicketInventory.ShippingTrackingNumber = ''; // 	External Shipping Tracking Number If any

  TicketInventory.Payments = [
    {
      PaymentModeId: '', // Payment Mode Id; Required if Payment mode details not provided
      Amount: {
        Amount: 0, // Payment Amount
        Currency: 'USD' // 3-Letter Currency Code
      },
      PaymentDate: ticketPost.date, // Date of payment
      PaymentMode: 3, // Method of Payment: PayPal = 1, eCheck = 2, Check = 3, MoneyOrder = 4, Card = 5, Cash = 6, Credit = 7, COD = 8, BankTransfer = 9, DebitCard=10, Other = 255
      PayPalEmail: '', // PayPal Email if PaymentMode = 1
      PayPalTransactionId: '', // PayPal Transactin Number if PaymentMode = 1
      Card: {
        CardType: 0, // Card Type: MasterCard = 1, Discover = 2, Amex = 3, JCB=4, Visa = 6. Required if the Payment Option is Card (5)
        CardNumber: '', // Last Four Digits of the Credit Card. Required if the Payment Option is Card (5)
        CardExpiryMonth: 0, // Expiry Month of the Credit Card. Required if the Payment Option is Card (5)
        CardExpiryYear: 0, // Expiry Year of the Credit Card. Required if the Payment Option is Card (5)
        NameOnCard: '' // Name on the Credit Card. Required if the Payment Option is Card (5)
      },
      BankName: '', // Bank Name Required if the Payment Mode is BankTransfer (9)
      AccountNumber: 0, // Bank Account Number.Required if the Payment Mode is BankTransfer (9)
      Description: '', // Payment Description Required if the Payment Mode is other (0)
      Note: '', // Notes for payment
      ReferenceNo: '' // Reference number for payment
    }
  ];
};

//InventoryTickets{[Tickets], {Vendors}};
let PostQuery = function PostQuery(ticketPost) {

  this.query = {
    Tickets: [new Ticket(ticketPost)]
  };

  addVendorData(this.query, ticketPost);

  const queryProduct = '/POS/Inventory/AddTickets';
  return new TicketUtils.Query('POST', queryProduct, this.query);
};

export default PostQuery;
