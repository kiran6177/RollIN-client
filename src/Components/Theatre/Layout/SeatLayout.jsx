import React, { useEffect,  useState } from 'react'
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import GridBlock from './GridBlock';
import { DndContext} from '@dnd-kit/core';
import DragSeat from './DragSeat';
import SaveModal from './SaveModal';
import { MdChair } from 'react-icons/md';

function SeatLayout() {
    const [searchParams] = useSearchParams();
    const screen_id = searchParams.get('screen_id');
    const tier_id = searchParams.get('tier_id');

    const {theatreScreenData,loading} = useSelector(state=>state.theatreFeat);

    const [screen,setScreen] = useState(null);
    const [tierData,setTierData] = useState(null);

    const [gridCol,setGridCol] = useState(1);

    
    const [colCount,setColCount] = useState(0)

    const [layouts,setLayouts] = useState([]);
    const [undoArr,setUndoArr] = useState([]);
    const [redoArr,setRedoArr] = useState([]);
    const [updatedLayouts,setUpdatedLayouts] = useState(null)

    const [seatId,setSeatId] = useState(1);

    const [showSave,setShowSave] = useState(false);

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
            const rows = Math.ceil(tierData?.seats/colCount) 
            const arr = Array.from({length:colCount*rows},(_,index)=>{
                return {
                    id:index+1,
                    status:false
                }
            })
            setLayouts(arr)
        }
    },[colCount])


    useEffect(()=>{
        if(updatedLayouts){
            setShowSave(true)
            return
        }
    },[updatedLayouts])

    const handleDragEnd = (event)=>{
        if(event.over){
            let existed = false;
            layouts.forEach(obj=>{
                if(obj.id === event.over?.id){
                    if(!obj.status){
                        setSeatId(prev=>prev+1)
                        setUndoArr(prev=>[...prev,{id:event.over?.id}])
                    }
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
            setSeatId(prev=>prev+1)
            setUndoArr(prev=>[...prev,{id:event.over?.id}])
            }
            setRedoArr([])
        }
    }


    

    const handleUndo = ()=>{
            
        const undoCopy = [...undoArr];
        const popped = undoCopy.pop();
        setUndoArr(undoCopy)
        if(popped){
            setLayouts(layouts.map(obj=>{
                if(obj.id === popped.id){
                    return {
                        ...obj,
                        status:false
                    }
                }
                return obj
            }))
            setSeatId(prev=>prev-1)
            setRedoArr(prev=>[...prev,popped])
        }

    }

    const handleRedo = ()=>{
        
        if(redoArr?.length > 0){
            let redoCopy = [...redoArr];
            let popped = redoCopy.pop()
            setRedoArr(redoCopy);
            if(popped){
                setLayouts(layouts.map(obj=>{
                    if(obj.id === popped.id){
                        return {
                            ...obj,
                            status:true
                        }
                    }
                    return obj
                }))
                setSeatId(prev=>prev+1)
                setUndoArr(prev=>[...prev,popped])
            }
        }
    }

    const handleSaveLayout = ()=>{

        const rows = Math.ceil(tierData?.seats / tierData?.columns)
        let newLayouts = {}
        for(let i = 1; i <= rows ; i++){
            newLayouts[i] = new Array(tierData?.columns + tierData?.horizontal_partition).fill(0)
        }
        layouts.map(item=>{
            let calc = parseFloat(item?.id)/parseFloat(tierData?.columns + tierData?.horizontal_partition)
            let key = Math.ceil(calc)
            if(newLayouts[key]){
                const index = (item?.id%colCount) - 1 === -1 ? colCount-1 :(item?.id%colCount) - 1
                newLayouts[key][index] = item?.status ? 1 : 0
            }
        })
        setUpdatedLayouts(newLayouts)
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
            <div className='flex flex-col  justify-center  my-6'>
                <h3 className='justify-items-start'>EXISTING LAYOUT</h3>
                {
                    tierData?.layout && tierData?.layout.length > 0 && tierData?.layout.map((obj,i)=>{
                        let key = Object.keys(obj)[0];
                        let value = obj[key]
                        return(
                        <div key={key+i} className='flex h-[100%] w-[70%] items-center mx-auto'>
                            <div className='text-white text-xs'>
                                <p className='text-lg'>{key}</p>
                            </div>
                            <div key={key+i} style={{gridTemplateColumns:`repeat(${value?.length},1fr)`}} className={`grid w-[100%]`}> 
                                {value.map((seats,i)=>{
                                    return(
                                        <div key={key+i}  className={` aspect-square flex justify-center items-center`}>
                                            {seats === 1 && <MdChair className='text-[#f6ae2d] w-[60%] h-[60%]' /> }
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        )
                    })
                }
            </div>
            <div className='flex flex-col md:flex-row justify-between'>
                <div className="w-[100%] md:w-[45%]"> 
                <label className='text-white text-xs tracking-widest'>Columns</label>
                <input type="number" value={tierData?.columns} onChange={(e)=>{setTierData(prev=>{
                    return {
                        ...prev,
                        columns:e.target.value ? parseInt(e.target.value) : '',
                        horizontal_partition:0
                    }
                }); setLayouts([]); setSeatId(1);setUndoArr([]);setRedoArr([])}} className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
                </div>
                <div className="w-[100%] md:w-[45%]">
                <label className='text-white text-xs tracking-widest'>Horizontal Partition</label>
                <input type="number" value={tierData?.horizontal_partition} onChange={(e)=>{setTierData(prev=>{
                    return {
                        ...prev,
                        horizontal_partition:e.target.value ? parseInt(e.target.value) : ''
                    }
                });setLayouts([]); setSeatId(1);setUndoArr([]);setRedoArr([])}}  className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
                </div>
            </div>
            <div className='my-8'>
                <DndContext onDragEnd={handleDragEnd} onDragStart={(e)=>console.log("DRAGSTART",e)}>
                <span style={{wordSpacing:'2px'}} className='text-white text-xs bg-[#d24d4d]  py-2 px-6 border-2 rounded-md border-[#d24d4d]'>Note: Horizontal partitions are included in the grid. Set the layout accordingly.</span>
                {
                    seatId <= tierData?.seats &&
                    <DragSeat id={seatId} />
                }
                <div className='flex justify-between'>
                <p className='text-white text-xs my-8'>Drag seats from here.</p>
                <div className='flex gap-4'>
                {undoArr?.length > 0 && <button onClick={handleUndo} className='text-white'>Undo</button>}
                {redoArr?.length > 0 && <button onClick={handleRedo} className='text-white'>Redo</button>}
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
            
           { seatId === (tierData?.seats + 1) && <div className='flex justify-center'>
                <button disabled={loading} onClick={handleSaveLayout} className={loading? 'bg-[#f6b02dd1] rounded-sm w-[100%] md:w-[60%] py-3 font-semibold tracking-widest text-md sm:text-xl text-black hover:scale-[1.01] transition-all duration-150 ease-linear ' :'text-black hover:scale-[1.01] transition-all duration-150 ease-linear bg-[#f6ae2d] rounded-sm w-[100%] md:w-[60%] py-3 font-semibold tracking-widest text-md sm:text-xl'}>SAVE</button>
            </div>}

        </div>}
        <SaveModal isOpen={showSave} set={setShowSave} setUpdate={setUpdatedLayouts} tierData={tierData} layout={updatedLayouts} />
      </div>
    </div>
  )
}

export default SeatLayout
