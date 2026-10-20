"use client";
import {createContext,useContext,useEffect,useMemo,useState} from "react";
export type SavedResult={slug:string;title:string;label:string;value:string;updatedAt:number};
type Workspace={results:SavedResult[];recent:string[];remember:(result:Omit<SavedResult,"updatedAt">)=>void;visit:(slug:string)=>void;clear:()=>void};
const Context=createContext<Workspace|null>(null);
const KEY="hitungin.workspace.v1";
export function WorkspaceProvider({children}:{children:React.ReactNode}){
 const [results,setResults]=useState<SavedResult[]>([]);
 const [recent,setRecent]=useState<string[]>([]);
 const [ready,setReady]=useState(false);
 useEffect(()=>{try{const raw=sessionStorage.getItem(KEY);if(raw){const saved=JSON.parse(raw) as {results?:SavedResult[];recent?:string[]};if(Array.isArray(saved.results))setResults(saved.results.slice(0,20));if(Array.isArray(saved.recent))setRecent(saved.recent.slice(0,8));}}catch{}setReady(true)},[]);
 useEffect(()=>{if(ready){try{sessionStorage.setItem(KEY,JSON.stringify({results,recent}))}catch{}}},[results,recent,ready]);
 const remember=(item:Omit<SavedResult,"updatedAt">)=>setResults(old=>[{...item,updatedAt:Date.now()},...old.filter(x=>x.slug!==item.slug)].slice(0,20));
 const visit=(slug:string)=>setRecent(old=>[slug,...old.filter(x=>x!==slug)].slice(0,8));
 const clear=()=>{setResults([]);setRecent([])};
 const value=useMemo(()=>({results,recent,remember,visit,clear}),[results,recent]);
 return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useWorkspace(){const value=useContext(Context);if(!value)throw new Error("WorkspaceProvider missing");return value;}
