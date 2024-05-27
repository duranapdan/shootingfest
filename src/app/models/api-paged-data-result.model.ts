export interface PagedList<T> {
  pages?: number;
  page?:number
  size?:number;
  hasNext?:boolean
  hasPrevious?:boolean
  count: number;
  items?:T[]  
}
