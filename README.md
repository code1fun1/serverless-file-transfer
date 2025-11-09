# 🔐 Serverless File Transfer System (SecureVault)

<p align="center">
  <img src="https://github.com/user-attachments/assets/81c20526-0830-46eb-b035-fe167a2bd91f"
       alt="SecureVault UI Preview"
       width="850"/>
  
</p>

![GitHub repo size](https://img.shields.io/github/repo-size/code1fun1/serverless-file-transfer)
![GitHub last commit](https://img.shields.io/github/last-commit/code1fun1/serverless-file-transfer)
![Vercel Deploy](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)
![License](https://img.shields.io/badge/license-MIT-green)

> 🌍 **Live Project:** [https://v0-secure-file-transfer-flame.vercel.app/](https://v0-secure-file-transfer-flame.vercel.app/)

---

## 🧠 Project Overview

The **Serverless File Transfer System (SecureVault)** is a secure and scalable cloud-based solution for **encrypted file upload, storage, and transfer** using **AWS Lambda, S3, and API Gateway** — all managed via a **Next.js frontend** deployed on **Vercel**.

It eliminates the need for traditional servers and ensures **end-to-end encryption**, **high availability**, and **cost efficiency**.

---

## 🏗️ System Architecture

<p align="center">
  <img src="https://github.com/code1fun1/serverless-file-transfer/blob/main/WhatsApp%20Image%202025-11-09%20at%2015.47.52_cc71652e.jpg" 
       alt="Serverless File Transfer Architecture"
       width="750"/>
</p>

### 🔹 Workflow

1. The user uploads a file through the **Next.js application**.  
2. The request is sent via **AWS API Gateway** to the appropriate **Lambda Function**.  
3. The **Upload Lambda Function** encrypts the file and stores it in **Amazon S3**.  
4. The **List Lambda Function** retrieves file metadata from S3.  
5. The **Download Lambda Function** decrypts and returns the file to the user.  
6. The frontend displays files and handles encryption/decryption seamlessly.

---

## ✨ Features

✅ **Serverless Architecture** – 100% cloud-based with AWS Lambda.  
✅ **AES-256 Encryption** – Secure end-to-end file encryption.  
✅ **Scalable & Reliable** – Auto-managed AWS infrastructure.  
✅ **Modern UI** – Built with Next.js and Tailwind CSS.  
✅ **Fast File Retrieval** – S3 integration for minimal latency.  
✅ **Cross-Platform Access** – Works on desktop, tablet, and mobile.  

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | Next.js, React, Tailwind CSS |
| **Backend (Serverless)** | AWS Lambda |
| **API Management** | AWS API Gateway |
| **Storage** | AWS S3 |
| **Encryption** | AES (CryptoJS) |
| **Deployment** | Vercel |
| **Version Control** | Git + GitHub |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/code1fun1/serverless-file-transfer.git
cd serverless-file-transfer
