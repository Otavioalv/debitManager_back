export type OrderByMap<
        TSort extends string,
        TOrder
    > =
    Record<
        NonNullable<TSort>,
        TOrder
    >;
