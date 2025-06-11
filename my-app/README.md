
````markdown
# 🤖 Olly — Your Offline AI Data Whisperer

**Olly** is an intelligent, fully **offline AI chatbot** that understands natural language and talks to your PostgreSQL database like a pro.

Built with ❤️ using  
**Next.js**, **PostgreSQL**, **ShadCN/UI**, **Ollama** (with **LLaMA 3.2**), and **Docker**.

> 🚫 No APIs. No Internet. Just raw, local, brainy power.

---

## 🧠 What does Olly do?

You ask in plain English, for example:
> _"Show me all assets under contract that are still active"_

Olly responds with:
```sql
SELECT * FROM AssetApp_asset WHERE amc_contract_id IS NOT NULL AND amc_end_date > CURRENT_DATE;
````

And then presents the result in a **clean, readable format**, like it's always been there.

---

## 💡 Key Features

✨ **Offline-First**: No external calls, your data stays safe on your machine
🧾 **Natural Language to SQL**: Converts questions to optimized queries
📊 **Readable Insights**: Converts SQL output into clean, human-like answers
⚙️ **Powered by LLaMA 3.2** via Ollama for locally running LLMs
🖥️ **Slick UI**: Styled with ShadCN and beautifully animated using Next.js
🐳 **Containerized**: Seamlessly deploy with Docker

---

## 🧱 Tech Stack

| Layer            | Tech                                              |
| ---------------- | ------------------------------------------------- |
| 🌐 Frontend      | `Next.js` + `Tailwind` + `ShadCN/UI`              |
| 🧠 AI Engine     | `Ollama` + `LLaMA 3.2`                            |
| 🗄️ Database     | `PostgreSQL` (natural language queried)           |
| 📦 Containerized | `Docker` (multi-service)                          | |

---

## 📸 Interface Preview

> *(Embed UI Screenshot here)*
> ![Olly Screenshot](./screenshot.png)

---

## 🛡️ Security & Privacy

* 💾 Runs completely offline
* 🔒 Your data never leaves your machine
* ✅ Perfect for private enterprise or secure internal use-cases(Made this during my internship in OIL(oil india limited))

---

## 🏁 Status

Olly is actively being developed — join the mission to make SQL obsolete (just kidding… or not).

---

## 📝 License

MIT License © 2025 [Prakhar Gupta](https://github.com/your-username)

---

> “Olly doesn't search. Olly *knows*.”
```
