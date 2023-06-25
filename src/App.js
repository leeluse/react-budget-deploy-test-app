import { useState } from "react";
import './App.css';
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import Alert from "./components/Alert";

const App = () => {
  const [expenses, setExpenses] = useState([
        { id: 1, charge: "렌트비", amount: 40000 },
        { id: 2, charge: "교통비", amount: 1600 },
        { id: 3, charge: "식비", amount: 7000 }
  ])


  const [id, setID] = useState('');
  const [edit, setEdit] = useState(false);
  const [charge, setCharge] = useState("");   
  const [amount, setAmount] = useState(0)
  const [alert, setAlert] = useState({show: false});

  // 지출항목 입력 받아와 state 넣기
  const handleCharge = (e) => {
    console.log(e.target.value)
    setCharge(e.target.value)
  }

  // 전체 Item 삭제
  const clearItems = () => {
    setExpenses([]);
  }

  // 가격 입력 받아와 state 넣기
  const handleAmount = (e) => {
    console.log(e.target.value)
    setAmount(e.target.valueAsNumber)
  }


  // 추가
  const handleSubmit = (e) => {
    // submit 이벤트 시 기본적으로 실행되는 동작 제거
    e.preventDefault();
    if (charge !== "" && amount > 0) {

      if (edit) {
        const newExpenses = expenses.map(item => {
          return item.id === id ? {...item, charge, amount} : item
        })

        setExpenses(newExpenses);
        setEdit(false);
        handleAlert({ type: 'success', text: '아이템이 수정되었습니다.'})
      }

      else {
        const newExpense = {id: crypto.randomUUID(), charge: charge, amount: amount}
        // 불변성을 지켜주기 위해서 새로운 expenses 생성
        const newExpenses = [...expenses, newExpense];
        setExpenses(newExpenses)
        setAmount(0)
        setCharge("")
        handleAlert({ type: "success", text: "아이템이 생성되었습니다."})
      }
    }
    else {
      console.log("error")
      handleAlert({ type: "danger", text: "charge는 빈 값일 수 없으며 amount는 보다 커야 합니다."})

    }
  }

  // 수정
  const handleEdit = id => {
    const expense = expenses.find(item => item.id === id);
    const { charge, amount } = expense;
    setID(id);
    setCharge(charge);
    setAmount(amount);
    setEdit(true);

  }

  // 알림
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({show: false})
    }, 7000)
  }

  // 삭제
  const handleDelete = (id) => {
    const newExpenses = expenses.filter(expense => expense.id !== id)
    console.log(newExpenses);
    setExpenses(newExpenses);
    handleAlert({ type: "danger", text: "아이템이 삭제되었습니다."})

  }

    return (
      <main className="main-container">
        {alert.show ? <Alert type={alert.type} text={alert.text}/> : null}
      <h1>예산 계산기</h1>
      <div style={{width:'100@', background:'white', padding: '1rem'}}>
      {/* Expense Form */}
      <ExpenseForm 
        charge={ charge }
        amount={amount}
        handleCharge={ handleCharge }
        handleAmount={ handleAmount }
        handleSubmit = { handleSubmit }
        edit = {edit}
      />
      </div>
      
      <div style={{width:'100@', background:'white', padding: '1rem'}}>
      {/* Expense List */}
      {/*  ExpenseList 컴포넌트로 전달되고 있는 것들 */}

      <ExpenseList 
      expenses={expenses} 
      handleDelete = {handleDelete}
      handleEdit = { handleEdit }
      clearItems = {clearItems}
      />
      
      </div>

      <div style={{display: 'flex', justifyContent: 'end', marginTop: '1rem'}}>
      <p style={{ fontSize: '2rem'}}>
        총 지출:
        <span>
          {expenses.reduce((acc, curr)=> {
            return (acc + curr.amount);
            }, 0) }  
          원</span>
      </p>
      </div>
      </main>
    )
  }

export default App;