package com.thbs.banking.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thbs.banking.entity.Customer;
import com.thbs.banking.entity.Transaction;
import com.thbs.banking.repository.CustomerRepository;
import com.thbs.banking.repository.TransactionRepository;

@Service
public class TranscationService {
	@Autowired
	private TransactionRepository transactionRepository;

	@Autowired
	private CustomerRepository customerRepository;

	public boolean deposite(Transaction transaction) {

		String accountNum = transaction.getAccountNum();
		Customer customer = customerRepository.findByAccountNo(accountNum);

		if (customer != null) {

			double balance = customer.getBalance();
			balance = balance + transaction.getAmount();
			customer.setBalance(balance);
			customerRepository.save(customer);

			String date = LocalDate.now().toString();
			transaction.setDate(date);

			transactionRepository.save(transaction);
			return true;

		}

		return false;
	}

	public boolean withdraw(Transaction transaction) {
		String accountNum = transaction.getAccountNum();
		Customer customer = customerRepository.findByAccountNo(accountNum);

		if (customer != null) {

			double balance = customer.getBalance();
			balance = balance - transaction.getAmount();
			if (balance < 0) {
				return false;
			}
			customer.setBalance(balance);
			customerRepository.save(customer);

			String date = LocalDate.now().toString();
			transaction.setDate(date);

			transactionRepository.save(transaction);
			return true;
		}
		return false;

	}

	public List<Transaction> getAll(String accountNum) {
		return transactionRepository.findAllByAccountNum(accountNum);
	}

	public boolean fundTransfer(List<Transaction> transactions) {
		int num = 0;
		for (Transaction transaction : transactions) {

			if (transaction.getType().equals("CREDIT")) {
				if (deposite(transaction)) {
					num++;
				}
			} else if (transaction.getType().equals("DEBIT")) {
				if (withdraw(transaction)) {
					num++;
				}
			}

		}
		if (num == 2) {
			return true;
		}
		return false;
	}
}
