import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from '@fluentui/react-components';

import Navbar from '../../components/Global/Navbar';
import background from '../../assets/auth-background.png';

export default function FAQ() {
  const questions = [
    {
      id: 1,
      question: 'Pegunta 1',
      answer:
        'When I press the power button on batteryWhen I press the power button on battery When I press the power button on batteryWhen I press the power button on batteryWhen I press the power button on batteryWhen I press the power button on battery',
    },
    {
      id: 2,
      question: 'Pegunta 2',
      answer:
        'When I press the power button on batteryWhen I press the power button on battery When I press the power button on batteryWhen I press the power button on batteryWhen I press the power button on batteryWhen I press the power button on battery',
    },
    {
      id: 3,
      question: 'Pegunta 3',
      answer:
        'When I press the power button on batteryWhen I press the power button on battery When I press the power button on batteryWhen I press the power button on batteryWhen I press the power button on batteryWhen I press the power button on battery',
    },
  ];

  return (
    <main className='min-h-screen bg-[#efefef]'>
      <Navbar title={'FAQ'} />
      <div>
        <img
          src={background}
          alt='background'
          className='rounded-br-[16px] rounded-bl-[16px] h-[120px] w-full object-cover'
        />
      </div>
      <div className='px-4'>
        <Accordion collapsible className=' !-mt-8 '>
          {questions.map((question) => (
            <AccordionItem
              value={question.id}
              className='!border-[1px] !rounded-md !shadow-sm'
            >
              <AccordionHeader
                expandIconPosition='end'
                className='!bg-white !rounded-[3px] !overflow-hidden'
              >
                <h3 className='!px-[6px] py-4'>{question.question}</h3>
              </AccordionHeader>
              <AccordionPanel className='!bg-zinc-100'>
                <p className='p-4 text-xs'>{question.answer}</p>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </main>
  );
}
