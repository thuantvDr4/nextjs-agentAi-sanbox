//  Tool = Tay, Chan, Mat, Mieng, ...

export const searchTool=(query:string)=>{
    return new Promise((resolve,reject)=>{

        setTimeout(()=>{
            resolve(`Thông tin tìm được về ${query}`)
        }, 100)
    })
}

export const summarizeTool=(text:string)=>{
  return new Promise((resolve,reject)=>{
      setTimeout(()=>{
          resolve(`Tom tắt: ${text.slice(0, 50)} ....`)
      }, 100)
  })
}