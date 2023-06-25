import './ExpenseList.css'
import {MdDelete} from 'react-icons/md'
import ExpenseItem from './ExpenseItem'


const ExpenseList = ({handleDelete, clearItems, expenses, handleEdit}) => {
    return (
    <>
    <ul className='List'>
    {/* Expense Item */}
      {expenses.map(expense => {
        return (
          // ExpenseItem 컴포넌트로 전달되고 있는 것들
          <ExpenseItem 
          handleEdit ={ handleEdit }
          expense={expense}
          key={expense.id}
          handleDelete = {handleDelete}
          />
        )
      })}
    </ul>
    {expenses.length > 0 && (
      <button className='btn' onClick={clearItems}>목록 지우기
      <MdDelete className='btn-icon'/>
        </button>  
    )}
    
    </>
    )
  }

export default ExpenseList

  