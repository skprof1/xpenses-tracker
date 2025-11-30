import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../api/firebaseConfig";
import { useAuth } from "./AuthContext";

const ExpenseContext = createContext();

export const useExpenses = () => useContext(ExpenseContext);

// eslint-disable-next-line react-hooks/exhaustive-deps
export const ExpenseProvider = ({ children }) => {
  const { user } = useAuth();

  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [budgets, setBudgets] = useState([]);

  const isMounted = useRef(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    isMounted.current = true;

    if (!user) {
      if (isMounted.current) {
        setExpenses([]);
        setCategories([]);
        setBudgets([]);
      }
      return;
    }

    const expensesQuery = query(
      collection(db, "expenses"),
      where("userId", "==", user.uid)
    );
    const categoriesQuery = query(
      collection(db, "categories"),
      where("userId", "==", user.uid)
    );
    const budgetsQuery = query(
      collection(db, "budgets"),
      where("userId", "==", user.uid)
    );

    const unsubscribeExpenses = onSnapshot(expensesQuery, (snapshot) => {
      if (isMounted.current) {
        const expensesArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setExpenses(expensesArray);
      }
    });

    const unsubscribeCategories = onSnapshot(categoriesQuery, (snapshot) => {
      if (isMounted.current) {
        const categoriesArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(categoriesArray);
      }
    });

    const unsubscribeBudgets = onSnapshot(budgetsQuery, (snapshot) => {
      if (isMounted.current) {
        const budgetsArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBudgets(budgetsArray);
      }
    });

    return () => {
      isMounted.current = false;
      unsubscribeExpenses();
      unsubscribeCategories();
      unsubscribeBudgets();
    };
  }, [user]);

  const addExpense = async (expense) => {
    if (!user) return;
    await addDoc(collection(db, "expenses"), {
      ...expense,
      userId: user.uid,
      createdAt: new Date(),
    });
  };

  const deleteExpense = async (id) => {
    await deleteDoc(doc(db, "expenses", id));
  };

  const updateExpense = async (id, updatedFields) => {
    await updateDoc(doc(db, "expenses", id), updatedFields);
  };

  const addCategory = async (category) => {
    if (!user) return;
    await addDoc(collection(db, "categories"), {
      ...category,
      userId: user.uid,
    });
  };

  const deleteCategory = async (id) => {
    await deleteDoc(doc(db, "categories", id));
  };

  const updateCategory = async (id, updatedFields) => {
    await updateDoc(doc(db, "categories", id), updatedFields);
  };

  const addBudget = async (budget) => {
    if (!user) return;
    await addDoc(collection(db, "budgets"), { ...budget, userId: user.uid });
  };

  const deleteBudget = async (id) => {
    await deleteDoc(doc(db, "budgets", id));
  };

  const updateBudget = async (id, updatedFields) => {
    await updateDoc(doc(db, "budgets", id), updatedFields);
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        categories,
        budgets,
        addExpense,
        deleteExpense,
        updateExpense,
        addCategory,
        deleteCategory,
        updateCategory,
        addBudget,
        deleteBudget,
        updateBudget,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
