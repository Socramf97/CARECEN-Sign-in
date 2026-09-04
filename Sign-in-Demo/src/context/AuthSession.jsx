import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { supabase } from "../../db/db.js";


const AuthContext = createContext()


/// User State is saved here (Logged in/out)
function AuthProvider({children}){
    const [session, setSession] = useState(null);

    useEffect(()=>{
        async function loadSession() {         /// Check for exisiting session
            const {data} = await supabase.auth.getSession()
            setSession(data.session) 
            if (data.session) supabase.rpc('claim_staff_row')
        }
        loadSession()
        /// Keeps track when user logs in/out
        const {data: listener } = supabase.auth.onAuthStateChange((event, newSession)=>{
            setSession(newSession)
            if (newSession) supabase.rpc('claim_staff_row')
        })

        return () =>{
            listener.subscription.unsubscribe() /// Tells DB to stop calling function, prevents memory leak
        }
    },[])

    return(
        <AuthContext.Provider value={{session}}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(){
    return(
        useContext(AuthContext)
    )
}

export {AuthProvider, useAuth}