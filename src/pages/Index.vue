<template>
  <q-page class="column bg-grey-3 q-px-lg q-pt-xl q-mb-md">
     <q-form
      @submit="onSubmit"
      
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="nombre"
        label="Nombre Funcionario"
        hint="Nombres y apellidos"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Escriba el nombre']"
      />
      <q-input
        filled
        v-model="ip"
        label="Dirección IP"
        mask="###.###.###.###"
        hint="Ejemplo: 192.168.088.001"
      />
       <q-select v-model="secretaria" :options="options" label="Secretaría" />
       <q-input
        filled
        v-model="oficina"
        label="Area u oficina"
        hint="Oficina segmentada a la secretaría"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Escriba el nombre de la oficina']"
      />
        <q-input
        filled
        v-model="dispositivo"
        label="Dispostivo Principal"
        hint="Ejemplo: HP 400 PRO"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Escriba el nombre del dispositivo principal']"
      />
        <q-input
        filled
        v-model="otrodispositivo"
        label="Otro dispositivos"
        hint="Ejemplo Impreso HP 1536"
        lazy-rules
        
        />
        <q-input
          filled
          v-model="otraip"
          label="Dirección IP Otro dispositivo"
          mask="###.###.###.###"
          hint="Ejemplo: 192.168.088.001"
        />
        <q-btn label="Agregar otro Dispotivo" @click="addDispositivo" color="info"/>
       <div class="text-h4">Aquí aparecen los otros dispositivos</div>
       <q-list bordered separator>
          <q-item v-for="(item, index) in dispositivos"
            :key="index">
            <q-item-section>
              <q-item-label>{{item.nombre}}</q-item-label>
              <q-item-label caption>{{item.ip}}</q-item-label>
              
            </q-item-section>
             <q-item-section top side>
              <div class="text-grey-8 q-gutter-xs">
                <q-btn class="gt-xs" size="12px" flat dense round icon="delete" @click="eliminar(index)" />
                
              </div>
            </q-item-section>
          </q-item>

      </q-list>
     

      <div>
        <q-btn label="Gurdar" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </q-page>
</template>

<script>
import { db } from "boot/firebase"; 

export default {
  name: 'PageIndex',
  data () {
    return {
      nombre: null,
      ip: null,
      secretaria:null,
      otrodispositivo:null,
      dispositivo:null,
      otraip:null,
      oficina:null,
      options:[
        'Secretaría General',
        'Secretaría de Infraestructura',
        'Secretaría de Gobierno',
        'Secretaría de Hacienda',
        'Secretaría de Tránsito',
        'Secretaría de Educación',
        'Secretaría de Planeación',

      ],
      dispositivos:[
        
      ]
    }
  },

  methods: {
    async onSubmit () {
      try {
        const query = await db.collection('funcionarios').add({
          nombre:this.nombre,
          ip:this.ip,
          secretaria:this.secretaria,
          oficina:this.oficina,
          dispositivo:this.dispositivo,
          otrosDispositivos:this.dispositivos
        });
        this.$q.notify({
          message: 'Datos del Funcionario Guardado!',
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done'
        });
        
        
      } catch (error) {
        this.$q.notify({
          message: 'Error'+error,
          color: 'red-4',
          textColor: 'white',
          icon: 'alert'
        });
      }finally{
        this.nombre=null;
        this.ip=null;
        this.oficina=null;
        this.secretaria='';
        this.dispositivos=[];
      }
      
    },
    eliminar(index){
      this.dispositivos.splice(index, 1);
    },
    addDispositivo(){
      this.dispositivos.push({nombre:this.otrodispositivo, ip:this.otraip});
      this.otrodispositivo=null;
      this.otraip=null;
    }
  }
}
</script>
