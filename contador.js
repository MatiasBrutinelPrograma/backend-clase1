
class Contador {

    //atributos
    //constructor
    //metodos

    static CONTADOR_GLOBAL = 0;

    constructor(responsable) {
        this.responsable = nombreResponsable;
        this.contadorResponsable = 0;
    }
    getResponsable() {
        return this.responsable;
    }

    contar() {
        this.contadorresponsable += 1;
    }

    getCuentaIndividual() {
        return this.contadorResponsable
    }

    getCuentaGlobal() {
        return Contador.CONTADOR_GLOBAL;
    }


}

module.export = Contador