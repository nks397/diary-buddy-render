import React, {createContext, useState} from "react"
import affirmations from "../components/affirmationData.js"
import journalPromptsOne from "../components/promptsDataOne.js"
import journalPromptsTwo from "../components/promptsDataTwo.js"
import journalPromptsThree from "../components/promptsDataThree.js"

const TemplateContext = createContext()


function TemplateContextProvider(props) {
    const dateForToday = new Date();
    const dayOfMonth = dateForToday.getDate();

    function goBack(e) {
        e.preventDefault()
        window.location.href = '/templates'
    }

    function dailyAffirmation() {
        // new Date() is a date constructor that gives you the month, day, year, hours, seconds, and milliseconds
        // The getDate() method returns the day of the month for the specified date according to local time.
        return affirmations.map(message => 
            message.date === dayOfMonth ? message.affirmation : null 
        )
    }

    function dailyPromptOne() {
        return journalPromptsOne.map(journalOne => 
            journalOne.date === dayOfMonth ? journalOne.prompts : null 
        )
    }
    function dailyPromptTwo() {
        return journalPromptsTwo.map(journalTwo => 
            journalTwo.date === dayOfMonth ? journalTwo.prompts : null 
        )
    }
    function dailyPromptThree() {
        return journalPromptsThree.map(journalThree => 
            journalThree.date === dayOfMonth ? journalThree.prompts : null 
        )
    }
    
    return (

        <TemplateContext.Provider value={{
            goBack,
            dailyAffirmation,
            dailyPromptOne,
            dailyPromptTwo,
            dailyPromptThree
        
        }}>{props.children}
        </TemplateContext.Provider>
        
    )
}

export {TemplateContextProvider, TemplateContext}