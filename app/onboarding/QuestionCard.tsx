import Button from "@/components/button/button"
export interface Question {
qId: string;     
  questionText?: string;
  choices?: string[];       

  scaleChoices?: Record<number, string>; 
  header?: string;           
  subheader?: string;         
  questions?: string[];
}

export interface QuestionCardProps { 
    question: Question;
}



export const QuestionCard = ({question} : {question: Question}) => {

    return (
        <div className="w-full min-w-screen h-[80%] flex flex-col items-center py-16">

            {question ? ( <h3 className="flex text-pacific-700">{question?.questionText}</h3>  ): null }


        </div>
    )
}