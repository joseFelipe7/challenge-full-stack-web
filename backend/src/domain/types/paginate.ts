
export type paginate<T> = {
    meta:{
        total:Number;
        page:Number;
        per_page:Number;
        first_page:Number;
        last_page:Number;
    },
    data: Array<T>;
}