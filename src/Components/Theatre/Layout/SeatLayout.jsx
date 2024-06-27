import React, { useEffect,  useState } from 'react'
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import GridBlock from './GridBlock';
import { DndContext} from '@dnd-kit/core';
import DragSeat from './DragSeat';

function SeatLayout() {
    const [searchParams] = useSearchParams();
    const screen_id = searchParams.get('screen_id');
    const tier_id = searchParams.get('tier_id');

    const {theatreScreenData} = useSelector(state=>state.theatreFeat);

    const [screen,setScreen] = useState(null);
    const [tierData,setTierData] = useState(null);

    const [gridCol,setGridCol] = useState(1);

    
    const [colCount,setColCount] = useState(0)

    const [layouts,setLayouts] = useState([]);


    const [seatId,setSeatId] = useState(1)

    useEffect(()=>{
        if(screen){
            if(screen?.tiers?.length > 0){
                screen.tiers.map(tier=>{
                    if(tier._id === tier_id){
                        setTierData(tier)
                    }
                })
            }
            return
        }
        console.log(theatreScreenData); 
        if(theatreScreenData?.length > 0){
            theatreScreenData.map(screenObj=>{
                if(screenObj._id === screen_id){
                    setScreen(screenObj)
                }
            })
        }
    },[screen])

    useEffect(()=>{
        console.log(tierData);
        if(tierData?.horizontal_partition < 0 || tierData?.columns < 0){
            toast.error('Invalid value')
        }
    },[tierData])

    useEffect(()=>{
        if(tierData?.columns > 0){
            setColCount(parseInt(tierData?.columns))
        }
    },[tierData?.columns])

    useEffect(()=>{
        if(tierData?.horizontal_partition > 0){
            setColCount(parseInt(tierData?.columns)+parseInt(tierData?.horizontal_partition))
        }
    },[tierData?.horizontal_partition])

    useEffect(()=>{
        if(colCount > 0){
            setGridCol(`repeat(${colCount},1fr)`) 
        }
    },[colCount])

    useEffect(()=>{
        console.log("LAYOUTS",layouts);
        console.log("SEATCURRENT",seatId);
        console.log("SEATS",tierData?.seats);
    },[layouts,tierData,seatId])

    const handleDragEnd = (event)=>{
        if(event.over){
            console.log(event);
            setSeatId(prev=>prev+1)
            let existed = false;
            layouts.forEach(obj=>{
                if(obj.id === event.over?.id){
                    setLayouts(prev=>{
                        return prev.map(object=>{
                            if(object.id === obj.id){
                                return {
                                    id:object?.id,
                                    status:true
                                }
                            }
                            return object
                        })
                    })
                    existed = true;
                    return
                }
            })
            if(!existed){
                setLayouts(prev=>{
                    return [...prev,{id:event.over?.id,status:true}]
                })
            }
        }
    }

    const handleUndo = ()=>{
            console.log(layouts);
            let newLayouts = [...layouts];
            let undone = false;
            for(let i = newLayouts.length - 1 ; i >=0 ;i--){
                console.log(newLayouts[i])
                if(newLayouts[i].status){
                    newLayouts[i] = {...newLayouts[i],status:false};
                    undone = true;
                    break;
                }
            }
            if(undone){
                console.log(newLayouts);
                setLayouts(newLayouts)
                setSeatId(prev=>prev-1)
            }
    }

    const handleRedo = ()=>{
        console.log(layouts);
        let newLayouts = [...layouts];
        let redone = false;
        for(let i = 0 ; i  < newLayouts.length ;i++){
            console.log(newLayouts[i])
            if(!newLayouts[i].status){
                newLayouts[i] = {...newLayouts[i],status:true};
                redone = true;
                break;
            }
        }
        if(redone){
            console.log(newLayouts);
            setLayouts(newLayouts)
            setSeatId(prev=>prev+1)
        }
    }

  return (
    <div className='pt-24 min-h-[80vh] bg-[#15121B]'>
      <Toaster richColors />
      <div className='p-12'>
        <h1 className='text-white tracking-wider font-semibold text-xl sm:text-2xl md:text-3xl '>LAYOUT CONFIGURATION</h1> 
        <div className='mt-6 '>
            <h3 className='text-white  text-lg'><span className='font-semibold text-[#f6ae2d]'>SCREEN : </span>{screen?.name}</h3>
        </div>
        <div className='text-white border-2 border-[#f6ae2d] rounded-md p-8 bg-black w-[70%] my-6 flex flex-col gap-2'>
            <h2 className='text-[#f6ae2d] text-lg font-medium tracking-wider'>TIER DETAILS</h2>
            <h3>{'Name : '+tierData?.name}</h3>
            <h3>{'Seats : '+tierData?.seats + ' Seats'}</h3>
            <h3>{'Rate : '+ tierData?.rate}</h3> 
        </div>
        {tierData && 
        <div className='text-white border-2 border-[#f6ae2d] rounded-md p-8 bg-black w-[100%] my-6'>
            <h2 className='text-[#f6ae2d] text-lg font-medium tracking-wider'>CONFIGURE</h2>
            <div className='flex flex-col md:flex-row justify-between'>
                <div className="w-[100%] md:w-[45%]"> 
                <label className='text-white text-xs tracking-widest'>Columns</label>
                <input type="number" value={tierData?.columns} onChange={(e)=>{setTierData(prev=>{
                    return {
                        ...prev,
                        columns:e.target.value ? parseInt(e.target.value) : ''
                    }
                }); setLayouts([]); setSeatId(1)}} className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
                </div>
                <div className="w-[100%] md:w-[45%]">
                <label className='text-white text-xs tracking-widest'>Horizontal Partition</label>
                <input type="number" value={tierData?.horizontal_partition} onChange={(e)=>{setTierData(prev=>{
                    return {
                        ...prev,
                        horizontal_partition:e.target.value ? parseInt(e.target.value) : ''
                    }
                });setLayouts([]); setSeatId(1)}}  className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
                </div>
            </div>
            <div className='my-8'>
                <DndContext onDragEnd={handleDragEnd}>
                <span style={{wordSpacing:'2px'}} className='text-white text-xs bg-[#d24d4d]  py-2 px-6 border-2 rounded-md border-[#d24d4d]'>Note: Horizontal partitions are included in the grid. Set the layout accordingly.</span>
                {
                    seatId <= tierData?.seats &&
                    <DragSeat id={seatId} />
                }
                <div className='flex justify-between'>
                <p className='text-white text-xs my-8'>Drag seats from here.</p>
                <div className='flex gap-4'>
                {layouts?.length > 0 && <button onClick={handleUndo} className='text-white'>Undo</button>}
                {layouts?.length > 0 && <button onClick={handleRedo} className='text-white'>Redo</button>}
                </div>
                </div>
            { tierData?.columns > 0 && 
                <div style={{gridTemplateColumns:gridCol}} className={`grid my-6`}>  
                    {
                        Array.from({length:(Math.ceil(tierData?.seats / (tierData?.columns === 0 ? 1 : tierData?.columns)))}).map((el,j)=>{ 
                            return(
                                
                                
                                Array.from({length:(colCount === 0 ? 1 : colCount)}).map((ele,i)=>{
                                    return(
                                        <GridBlock key={(i+1)+(((j+1)*colCount)-colCount)} id={(i+1)+(((j+1)*colCount)-colCount)} layouts={layouts}  />
                                    )
                                })
                            
                            )
                        })
                    } 
                </div>} 
                </DndContext>
            </div>
        </div>}
      </div>
    </div>
  )
}

export default SeatLayout
