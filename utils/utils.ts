
export function stringToColor(str: string): string {
    // 预定义一组柔和的颜色，适合用户标识
    const colors = [
      '#FF9AA2', // 柔和的红色
      '#FFB7B2', // 柔和的粉色
      '#FFDAC1', // 柔和的橙色
      '#E2F0CB', // 柔和的绿色
      '#B5EAD7', // 薄荷绿
      '#C7CEEA', // 柔和的蓝色
      '#9BB7D4', // 淡蓝色
      '#B5B9FF', // 淡紫色
      '#DCD3FF', // 薰衣草色
      '#F0D1E6', // 浅玫瑰色
    ];
  
    // 使用字符串生成一个确定性的索引
    let total = 0;
    for (let i = 0; i < str.length; i++) {
      total += str.charCodeAt(i);
    }
    
    // 确保索引在颜色数组范围内
    const index = total % colors.length;
    return colors[index];
  }
  
  