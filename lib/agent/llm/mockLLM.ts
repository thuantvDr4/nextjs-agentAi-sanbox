export function mockLLMRaw_OK() {
    return `
  {
    "action": "SEARCH",
    "reason": "Chưa có dữ liệu tìm kiếm",
    "params": {
      "query": "AI agents trends 2025"
    }
  }
  `;
}

export function mockLLMRaw_WithText() {
    return `
  Sure! Based on the current state, here is my decision:

  {
    "action": "SUMMARIZE",
    "reason": "Đã có kết quả tìm kiếm, cần tóm tắt để trả lời",
    "params": {}
  }
  `;
}

export async function mockLLMRaw_Bad() {
    return `
  {
    "action": "THINK",
    "reason": 123,
    "params": "hello"
  }
  `;
}