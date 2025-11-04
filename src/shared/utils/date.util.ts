import { CartItemPeriodicity } from "../enums/CartItem.enum";

export const getEndDate = (date: Date, periodicity?: CartItemPeriodicity) => {
  switch (periodicity) {
    case CartItemPeriodicity.MONTHLY:
      const montlyDate = new Date(date);
      montlyDate.setMonth(date.getMonth() + 1);
      return montlyDate;
  
    case CartItemPeriodicity.QUARTERLY:
      const quarterlyDate = new Date(date);
      quarterlyDate.setMonth(date.getMonth() + 3);
      return quarterlyDate;

    case CartItemPeriodicity.YEARLY:
      const yearlyDate = new Date(date);
      yearlyDate.setFullYear(date.getFullYear() + 1);
      return yearlyDate;

    default:
      throw new Error('Invalid periodicity')
  }
}