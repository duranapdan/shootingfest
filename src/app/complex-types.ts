export class RoleTypes {
    /// <summary>
    /// Admin
    /// </summary>
    public readonly ADMIN = "Admin";
    /// <summary>
    /// Distributor
    /// </summary>
    public readonly DISTRIBUTOR = "Distributor";
    /// <summary>
    /// Toptancı
    /// </summary>
    public readonly WHOLESALER = "Wholesaler";
    /// <summary>
    /// Zincir Market
    /// </summary>
    public readonly CHAIN_MARKET = "ChainMarket";
    /// <summary>
    /// Süper Market
    /// </summary>
    public readonly SUPER_MARKET = "SuperMarket";
    /// <summary>
    /// Kiosk
    /// </summary>
    public readonly KIOSK = "Kiosk";
    /// <summary>
    /// Food Service - Horaca
    /// </summary>
    public readonly FOOD_SERVICE = "FoodService";
    /// <summary>
    /// Export Distributor
    /// </summary>
    public readonly EX_DISTRIBUTOR = "ExDistributor";
    /// <summary>
    /// Export Toptancı
    /// </summary>
    public readonly EX_WHOLESALER = "ExWholesaler";
    /// <summary>
    /// Export Zincir Market
    /// </summary>
    public readonly EX_CHAIN_MARKET = "ExChainMarket";
    /// <summary>
    /// Export Food Service - Horaca
    /// </summary>
    public readonly EX_FOOD_SERVICE = "ExFoodService";
    /// <summary>
    /// Export FMCG
    /// </summary>
    public readonly EX_FMCG = "ExFMCG";
}

export enum RecordStatus {
    Active = 1,
    Passive = 2
}

export enum SortDirection {
    Asc,
    Desc
}

export enum OtpStatus {
    FastLogin = 1,
    ForgotPassword = 2,
}

export enum ShoppingCartItemTypes {
    None = 0,
    Adding = 1,
    Update = 2,
}

export enum CoinType {
    // TODO : Tipler belirlenecek.
    Unknow,
    TypeA
}

export enum AddressTypes {
    None = 0,
    Billing = 1,
    Delivery = 2,
}

export enum ConfirmStatus {
    Waiting,
    Confirmed,
    Rejected
}

export enum ConfirmationTypes {
    None = 0,
    UserEdit = 1,
    CompanyEdit = 2,
    AddressEdit = 3,
    UserCreate = 4
}

export enum PromotionType {
    Discount = 1,
    Product = 2,
    Coupon = 3,
    Coin = 4,
    NewMembership = 5,
    AfterShopping = 6,
}

export enum OrderUnitType {
    Piece = 1,
    Box = 2,
    Pallet = 3
}

export enum TransactionType {
    OrderEarn = 1,
    OrderUse = 2,
}

export enum DiscountType {
    ByPercent = 1,
    ByFixed = 2,
}

export enum OrderSummaryStatus {
    None = 0,
    AfterShoppingCart = 1,
    AfterShipping = 2,
    AfterAdditionalService = 3,
    AfterAddress = 4,
    AfterOrder = 5
}

export enum OrderStatus {
    None = 0,
    AwaitingApproval = 1,
    AwaitingPayment = 2,
    Approved = 3,
    Delivered = 4,
    Canceled = 5,
    OrderSubmited = 6,
    Paid = 7,
    Refund = 8,
}

export enum SupportRequestType {
    None,
    Technic,
    Sale
}

export enum SupportRequestStatus {
    All,
    Open,
    Answered
}

export enum CouponCodeUseStatus {
    Available,
    Used,
    NotFound
}
export enum SubClientStatus {
    None,
    Active,
    Passive
}

export enum LangugaId {
    English = 1,
    German = 2,
    Turkish = 3,
}

export enum ServiceType {
    Shipper = 1,
    AdditionalService = 2,
    Pallet = 3,
}

export enum ProductTopInfoIconType {
    None = 0,
    InStock = 1,
    OutStock = 2,
    LastWeek = 3,
}