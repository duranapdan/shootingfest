export interface DynamicFilter   {
    field?: string;
    operator?: string;
    value?: string;
    logic?: string;
    filters?: Filter[];
  }


  export interface Filter {
    field: string;
    operator: string;
    value?: string;
    logic?:string;
    filters?: DynamicFilter[];
  }
  
  
  export interface Sort {
    field: string;
    dir: string;
  }
  
  export interface DynamicFilterBase {
    sort?: Sort[];
    filter?: DynamicFilter;
  }