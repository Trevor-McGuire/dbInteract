const { gql } = require("apollo-server-express");

const ebayApi = gql`
  type DealItem {
    dealItems: [DealItem!] # List of deal items.
    additionalImages: [EbayImage!] # Additional images for the deal item.
    categoryAncestorIds: [String!] # Ancestor IDs for the primary category.
    categoryId: String # Leaf category ID for the deal item.
    commissionable: Boolean # Whether the listing has commission.
    dealAffiliateWebUrl: String # Deal URL with affiliate attribution.
    dealEndDate: String # Date when the deal ends.
    dealStartDate: String # Date when the deal starts.
    dealWebUrl: String # Web URL for the deal.
    energyEfficiencyClass: String # Energy Efficiency class.
    image: EbayImage # Primary image for the deal item.
    itemAffiliateWebUrl: String # Item URL with affiliate attribution.
    itemGroupId: String # Identifier for the deal item group.
    itemGroupType: ItemGroupTypeEnum # Type of item group.
    itemId: String # Identifier for the deal item.
    itemWebUrl: String # Web URL for the deal item.
    legacyItemId: String # Legacy item ID.
    marketingPrice: MarketingPrice # Original price and discount.
    price: Amount # Price for the deal item.
    qualifiedPrograms: [ProgramEnum!] # Applicable programs.
    shippingOptions: [ShippingOption!] # Shipping cost.
    title: String # Title of the deal item.
    unitPrice: UnitPrice # Price per unit.
    unitPricingMeasure: String # Quantity designation.
  }

  type EbayImage {
    height: String # EbayImage height.
    imageUrl: String # EbayImage URL.
    text: String # EbayImage text.
    width: String # EbayImage width.
  }

  type MarketingPrice {
    discountAmount: Amount # Seller discount amount.
    discountPercentage: String # Seller discount percentage.
    originalPrice: Amount # Item price before discount.
    priceTreatment: PriceTreatmentEnum # Pricing treatment.
  }

  type Amount {
    currency: CurrencyCodeEnum # Currency code.
    value: String # Monetary value.
  }

  type ShippingOption {
    shippingCost: Amount # Final shipping cost.
    shippingCostType: String # Shipping cost class.
  }

  type UnitPrice {
    currency: CurrencyCodeEnum # Currency code.
    value: String # Monetary value.
  }

  enum ProgramEnum {
    EBAY_PLUS
  }

  enum ItemGroupTypeEnum {
    SELLER_DEFINED_VARIATIONS
  }

  enum PriceTreatmentEnum {
    MINIMUM_ADVERTISED_PRICE
    LIST_PRICE
    MARKDOWN
  }

  enum CurrencyCodeEnum {
    AED
    AFN
    ALL
    AMD
    ANG
    AOA
    ARS
    AUD
    AWG
    AZN
    BAM
    BBD
    BDT
    BGN
    BHD
    BIF
    BMD
    BND
    BOB
    BRL
    BSD
    BTN
    BWP
    BYR
    BZD
    CAD
    CDF
    CHF
    CLP
    CNY
    COP
    CRC
    CUP
    CVE
    CZK
    DJF
    DKK
    DOP
    DZD
    EGP
    ERN
    ETB
    EUR
    FJD
    FKP
    GBP
    GEL
    GHS
    GIP
    GMD
    GNF
    GTQ
    GYD
    HKD
    HNL
    HRK
    HTG
    HUF
    IDR
    ILS
    INR
    IQD
    IRR
    ISK
    JMD
    JOD
    JPY
    KES
    KGS
    KHR
    KMF
    KPW
    KRW
    KWD
    KYD
    KZT
    LAK
    LBP
    LKR
    LRD
    LSL
    LTL
    LYD
    MAD
    MDL
    MGA
    MKD
    MMK
    MNT
    MOP
    MRO
    MUR
    MVR
    MWK
    MXN
    MYR
    MZN
    NAD
    NGN
    NIO
    NOK
    NPR
    NZD
    OMR
    PAB
    PEN
    PGK
    PHP
    PKR
    PLN
    PYG
    QAR
    RON
    RSD
    RUB
    RWF
    SAR
    SBD
    SCR
    SDG
    SEK
    SGD
    SHP
    SLL
    SOS
    SRD
    STD
    SYP
    SZL
    THB
    TJS
    TMT
    TND
    TOP
    TRY
    TTD
    TWD
    TZS
    UAH
    UGX
    USD
    UYU
    UZS
    VEF
    VND
    VUV
    WST
    XAF
    XCD
    XOF
    XPF
    YER
    ZAR
    ZMW
  }

  input GetDealItemsInput {
    limit: Int # Optional. maximum number of items
    offset: Int # Default: 0. Optional.
    category_ids: [String!] # Optional. If not provided, items from all categories may be returned.
    commissionable: Boolean # Optional. If not provided, items regardless of their commissionable status may be returned.
    delivery_country: String # Optional. If not provided, items that can be shipped to any country may be returned.
  }

  type Query {
    getDealItems(input: GetDealItemsInput): [DealItem!]!
  }
`;

module.exports = ebayApi;
