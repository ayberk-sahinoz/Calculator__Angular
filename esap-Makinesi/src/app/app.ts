  protected calculate(): void {
    try {
      const expression = this.display;
      const result = Function('"use strict";return (' + expression + ')')();
      
      // Sayıyı formatlama
      let formattedResult: string;
      if (typeof result === 'number') {
        // Eğer sayı ondalıklı ise
        if (result.toString().includes('.')) {
          // Noktadan sonraki kısmı al
          const decimalPart = result.toString().split('.')[1];
          
          // Eğer ondalık kısım 10 karakterden uzunsa
          if (decimalPart.length > 10) {
            // Sayıyı 10 ondalık basamağa yuvarla
            formattedResult = result.toFixed(10);
          } else {
            formattedResult = result.toString();
          }
        } else {
          formattedResult = result.toString();
        }
      } else {
        formattedResult = result.toString();
      }

      this.display = formattedResult;
      
      // Geçmişe ekleme
      this.history.unshift({
        expression: expression,
        result: formattedResult,
        timestamp: new Date()
      });

      // Geçmişi 10 kayıtla sınırla
      if (this.history.length > 10) {
        this.history.pop();
      }
    } catch (error) {
      this.display = 'Hata';
      setTimeout(() => {
        this.clear();
      }, 1000);
    }
  }

  calculateSqrt(): void {
    const value = parseFloat(this.display);
    if (!isNaN(value)) {
      const result = Math.sqrt(value);
      // Karekök sonucunu da 10 basamakla sınırla
      if (result.toString().includes('.')) {
        const decimalPart = result.toString().split('.')[1];
        if (decimalPart.length > 10) {
          this.display = result.toFixed(10);
        } else {
          this.display = result.toString();
        }
      } else {
        this.display = result.toString();
      }
    }
  } 