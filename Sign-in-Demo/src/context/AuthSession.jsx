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
            if (data.session) {
                const { error } = await supabase.rpc('claim_staff_row')
                if (error) console.error('Error claiming staff row:', error)
            }
        }
        loadSession()
        /// Keeps track when user logs in/out
        const {data: listener } = supabase.auth.onAuthStateChange(async (event, newSession)=>{
            setSession(newSession)
            if (newSession) {
                const { error } = await supabase.rpc('claim_staff_row')
                if (error) console.error('Error claiming staff row:', error)
            }
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