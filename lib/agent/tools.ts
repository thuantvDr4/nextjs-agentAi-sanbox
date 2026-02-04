//  Tool = Tay, Chan, Mat, Mieng, ...

export const searchTool=(query:string)=>{
    return new Promise((resolve,reject)=>{
        resolve(`Thông tin tìm được về ${query}`)
    })
}

export const summarizeTool=(text:string)=>{
  return new Promise((resolve,reject)=>{
      resolve(`Tom tắt: ${text.slice(0, 50)} ....`)
  })
}