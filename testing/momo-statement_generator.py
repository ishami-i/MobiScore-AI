import csv
import random
from datetime import datetime, timedelta
import uuid

BUSINESS_NAME = "ISHAMI ENTERPRISE LTD"
BUSINESS_NUMBER = "250788123456"

CUSTOMERS = [
    ("Eric NZAYISENGA", "250788111391"),
    ("JUVENS HAKIZIMANA", "250780335364"),
    ("Alice MUKAMANA", "250788222123"),
    ("Jean BOSCO", "250788333456"),
    ("Patrick MUGISHA", "250788444111"),
    ("Emmanuel NDAYISABA", "250788555222"),
    ("Claudine UWASE", "250788666333"),
    ("Yvette MUKARURANGA", "250788777444"),
]

MERCHANTS = [
    ("SONNYSAFIA Ltd", "1879709"),
    ("SP SUPERMARKET", "1045789"),
    ("CANAL+", "445612"),
    ("RRA", "100221"),
    ("WASAC", "300145"),
]

TRANSACTION_TYPES = [
    "Received",
    "Transfer",
    "Merchant Payment",
]

balance = 50000

rows = []

start = datetime(2026, 1, 1, 8, 0)

for i in range(500):

    tx_type = random.choice(TRANSACTION_TYPES)

    date = start + timedelta(
        days=random.randint(0, 210),
        minutes=random.randint(0, 1440),
    )

    amount = random.randint(500, 250000)

    fee = 0

    sender = ""
    receiver = ""
    sender_number = ""
    receiver_number = ""
    merchant = ""
    merchant_code = ""

    previous_balance = balance

    if tx_type == "Received":

        sender, sender_number = random.choice(CUSTOMERS)

        balance += amount

        transaction_text = (
            f"You have received {amount:,} RWF "
            f"from {sender} ({sender_number}) "
            f"at {date}."
        )

    elif tx_type == "Transfer":

        receiver, receiver_number = random.choice(CUSTOMERS)

        fee = random.choice([20, 30, 50, 100, 150])

        balance -= amount + fee

        transaction_text = (
            f"*165*S*{amount:,} RWF transferred to "
            f"{receiver} ({receiver_number}) "
            f"at {date}. "
            f"Fee: {fee} RWF."
        )

    else:

        merchant, merchant_code = random.choice(MERCHANTS)

        fee = 0

        balance -= amount

        transaction_text = (
            f"TxId:* Your payment of {amount:,} RWF "
            f"to {merchant} {merchant_code} "
            f"was completed at {date}. "
            f"Fee: {fee} RWF."
        )

    if balance < 0:
        balance = random.randint(5000, 20000)

    txid = str(random.randint(29000000000,29999999999))

    ftid = str(random.randint(29000000000,29999999999))

    rows.append({
        "Transaction ID": txid,
        "FT ID": ftid,
        "Transaction Type": tx_type,
        "Date": date.strftime("%Y-%m-%d"),
        "Time": date.strftime("%H:%M:%S"),
        "Sender Name": sender,
        "Sender Number": sender_number,
        "Receiver Name": receiver,
        "Receiver Number": receiver_number,
        "Merchant": merchant,
        "Merchant Code": merchant_code,
        "Business Name": BUSINESS_NAME,
        "Business Number": BUSINESS_NUMBER,
        "Amount": amount,
        "Fee": fee,
        "Previous Balance": previous_balance,
        "Remaining Balance": balance,
        "Currency": "RWF",
        "Status": "Successful",
        "SMS Message": transaction_text,
    })

rows.sort(key=lambda x: (x["Date"], x["Time"]))

with open("momo_statement.csv", "w", newline="", encoding="utf-8") as f:

    writer = csv.DictWriter(f, fieldnames=rows[0].keys())

    writer.writeheader()

    writer.writerows(rows)

print("Generated", len(rows), "transactions.")
print("Saved to momo_statement.csv")