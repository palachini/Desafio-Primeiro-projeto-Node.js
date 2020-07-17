import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  static getBalance() {
    throw new Error("Method not implemented.");
  }

  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((total, balance) => {
      if (balance.type === 'income') {
        return (total += balance.value);
      }
      return total;
    }, 0);

    const outcome = this.transactions.reduce((total, balance) => {
      if (balance.type === 'outcome') {
        return (total += balance.value);
      }
      return total;
    }, 0);

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, type, value }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, type, value });
    const balance = this.getBalance();
    if (transaction.type === 'outcome' && balance.total < transaction.value) {
      throw Error('Balance less than outcome');
    }
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
