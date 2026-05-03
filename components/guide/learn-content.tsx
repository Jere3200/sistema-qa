"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Lightbulb,
  Users,
  ClipboardList,
  Pencil,
  Code2,
  TestTube2,
  Rocket,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Wrench,
  Target,
  MessageSquare,
  Eye,
  Zap,
  FileText,
  GitBranch,
  ArrowRight,
  ArrowDown,
  Settings2,
  Search,
  FileEdit,
  RefreshCcw,
  Layers,
  AlertCircle,
  TrendingUp,
  Clock,
  Shield,
  Calendar,
  FolderKanban,
  FlaskConical,
  CheckSquare,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface Etapa {
  id: string
  numero: number
  nombre: string
  icono: React.ReactNode
  color: string
  colorTexto: string
  colorFondo: string
  resumen: string
  quees: string
  porque: string
  como: string[]
  tecnicas: string[]
  entregable: string
  errorComun: string
  preguntaClave: string
}

interface Methodology {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  characteristics: string[]
  advantages: string[]
  disadvantages: string[]
  bestFor: string[]
}

// ─── Datos ────────────────────────────────────────────────────────────────────

const etapas: Etapa[] = [
  {
    id: "analisis",
    numero: 1,
    nombre: "Análisis de Requisitos",
    icono: <ClipboardList className="h-6 w-6" />,
    color: "bg-blue-500",
    colorTexto: "text-blue-700",
    colorFondo: "bg-blue-50",
    resumen: "Entender el problema e identificar qué debe hacer el sistema",
    quees: "La fase más crítica del proyecto. Comprende tres actividades inseparables: identificar la necesidad real (por qué existe el sistema), relevar información de todos los involucrados (entrevistas, observación, documentos), y transformar todo eso en requisitos concretos y verificables.",
    porque: "Un error en los requisitos es el error más caro del desarrollo. Corregirlo durante el análisis cuesta casi nada. El mismo error encontrado en producción puede costar 100 veces más. La mayoría de los proyectos fracasados fallaron porque construyeron el sistema correcto para el problema equivocado.",
    como: [
      "Identificar a todos los stakeholders: quién usa el sistema, quién lo paga, quién se ve afectado",
      "Realizar entrevistas con cada tipo de usuario (no solo con quien encarga el sistema)",
      "Observar el proceso actual: cómo trabajan hoy sin el sistema, qué les frustra, qué les lleva más tiempo",
      "Clasificar requisitos funcionales (qué hace el sistema) y no funcionales (rendimiento, seguridad, usabilidad)",
      "Escribir historias de usuario: Como [rol], quiero [acción], para [beneficio]",
      "Definir criterios de aceptación verificables para cada historia",
      "Priorizar con MoSCoW: Must (imprescindible), Should (importante), Could (deseable), Won't (fuera de alcance)"
    ],
    tecnicas: ["Entrevistas estructuradas", "Historias de Usuario", "Criterios de Aceptación", "Priorización MoSCoW", "Observación directa (shadowing)", "5 Por Qué"],
    entregable: "Backlog priorizado de historias de usuario con criterios de aceptación verificables",
    errorComun: "Hablar solo con quien encarga el sistema (la gerencia), ignorando a los usuarios operativos que realmente lo van a usar. Ellos conocen los casos borde y las excepciones que nadie más menciona.",
    preguntaClave: "¿Puedo escribir una prueba para cada requisito? ¿Sé exactamente cuándo está cumplido y cuándo no?"
  },
  {
    id: "diseno",
    numero: 2,
    nombre: "Diseño del Sistema",
    icono: <Pencil className="h-6 w-6" />,
    color: "bg-purple-500",
    colorTexto: "text-purple-700",
    colorFondo: "bg-purple-50",
    resumen: "Planificar la solución técnica antes de escribir una sola línea de código",
    quees: "El diseño es el plano del sistema. Se define la arquitectura (qué componentes existen y cómo se conectan), el modelo de datos (qué información se almacena y cómo se relaciona) y las interfaces de usuario (wireframes con la estructura de las pantallas).",
    porque: "Construir sin diseño es como construir una casa sin planos. Podés avanzar rápido al principio, pero terminás derribando paredes. Cambiar un diagrama cuesta minutos; cambiar código funcional que ya integró otro módulo puede costar días. El diseño también facilita el trabajo en equipo: sin él, cada desarrollador inventa su propia solución.",
    como: [
      "Definir la arquitectura: qué capas tiene el sistema (frontend, backend, base de datos, servicios externos)",
      "Diseñar el modelo de datos: tablas, campos, relaciones, restricciones de integridad",
      "Crear wireframes (bocetos de pantallas) centrados en la estructura, no en el diseño visual",
      "Definir los flujos de usuario: qué hace el sistema paso a paso para cada funcionalidad principal",
      "Documentar decisiones técnicas importantes y sus justificaciones",
      "Validar el diseño con el equipo técnico Y con el cliente antes de empezar a codificar"
    ],
    tecnicas: ["Diagramas de Arquitectura", "Modelo Entidad-Relación (ERD)", "Wireframes", "Diagramas de Flujo", "Diagramas de Secuencia UML", "Prototipado en papel"],
    entregable: "Documento de diseño: arquitectura del sistema, modelo de datos (ERD), wireframes validados por el cliente",
    errorComun: "Diseñar mentalmente sin documentar. Si el diseño solo existe en la cabeza de una persona, no existe para el resto del equipo. Cuando esa persona se va de vacaciones (o del proyecto), el conocimiento desaparece.",
    preguntaClave: "¿Puede cualquier miembro del equipo entender cómo funciona el sistema solo leyendo la documentación de diseño?"
  },
  {
    id: "desarrollo",
    numero: 3,
    nombre: "Desarrollo / Implementación",
    icono: <Code2 className="h-6 w-6" />,
    color: "bg-green-500",
    colorTexto: "text-green-700",
    colorFondo: "bg-green-50",
    resumen: "Escribir código de forma iterativa, mostrando avances al cliente regularmente",
    quees: "La fase donde se escribe el código. Pero no de una sola vez: se construye en ciclos cortos (sprints de 1-4 semanas), priorizando las funcionalidades más críticas primero y mostrando incrementos al cliente al final de cada ciclo para recolectar feedback real.",
    porque: "El desarrollo iterativo permite corregir el rumbo antes de que sea tarde. Si trabajás 6 meses en silencio y el cliente ve el resultado recién al final, cualquier malentendido de requisitos se convierte en meses de retrabajo. Si mostrás algo funcional cada 2 semanas, los cambios son pequeños y manejables.",
    como: [
      "Tomar las historias de usuario del backlog por orden de prioridad y desarrollarlas una a una",
      "Seguir estándares de código acordados por el equipo (naming, estructura, comentarios)",
      "Hacer revisiones de código (code review) entre pares antes de integrar cambios",
      "Escribir pruebas unitarias para las funciones más críticas",
      "Integrar y verificar frecuentemente — no acumular código sin integrar durante semanas",
      "Actualizar el estado de las historias: Backlog → In Progress → Testing",
      "Mostrar el incremento al cliente al final de cada sprint y ajustar según su feedback"
    ],
    tecnicas: ["Sprints / Iteraciones", "Code Review", "Integración Continua (CI)", "Control de versiones con Git", "Pair Programming", "Pruebas unitarias"],
    entregable: "Incrementos funcionales del sistema al final de cada sprint, código versionado, documentación técnica actualizada",
    errorComun: "Trabajar meses sin mostrar nada al cliente ('big bang delivery'). El feedback tardío genera cambios masivos. Además, los desarrolladores tienden a sobrestimar cuánto entienden el negocio del cliente.",
    preguntaClave: "¿Estamos entregando valor funcional al cliente regularmente, o acumulando trabajo que nadie ha visto todavía?"
  },
  {
    id: "pruebas",
    numero: 4,
    nombre: "Pruebas / QA",
    icono: <TestTube2 className="h-6 w-6" />,
    color: "bg-amber-500",
    colorTexto: "text-amber-700",
    colorFondo: "bg-amber-50",
    resumen: "Verificar que el sistema funciona correctamente, incluyendo los casos de error",
    quees: "Las pruebas son la verificación objetiva de que el sistema cumple los requisitos definidos. No es 'usar el sistema y ver si funciona', sino ejecutar escenarios diseñados previamente (casos de prueba) y comparar el resultado real con el resultado esperado, incluyendo escenarios de error.",
    porque: "Las pruebas detectan errores antes de que lleguen al usuario final. Un bug en producción puede dañar datos reales, interrumpir operaciones críticas y destruir la confianza del cliente. Además, una buena suite de pruebas permite modificar el sistema con confianza: si las pruebas pasan, no rompiste nada.",
    como: [
      "Crear casos de prueba basados en los criterios de aceptación de cada historia (hay una relación directa)",
      "Usar formato Gherkin: Dado [contexto inicial] / Cuando [acción del usuario] / Entonces [resultado esperado]",
      "Diseñar pruebas para el camino feliz (happy path) Y para los casos de error",
      "Ejecutar pruebas de regresión: asegurarse de que las nuevas funcionalidades no rompieron las anteriores",
      "Realizar pruebas de aceptación de usuario (UAT) con usuarios reales, no con el equipo de desarrollo",
      "Documentar cada defecto encontrado con: pasos para reproducirlo, resultado actual, resultado esperado"
    ],
    tecnicas: ["Formato Gherkin (Dado/Cuando/Entonces)", "Pruebas de Regresión", "UAT (User Acceptance Testing)", "Testing Exploratorio", "Pruebas de Borde (Edge Cases)", "Matriz de Trazabilidad"],
    entregable: "Casos de prueba documentados y ejecutados, reporte de defectos, certificación de calidad firmada por el cliente",
    errorComun: "Probar solo el camino feliz (todo funciona, el usuario no comete errores, hay conexión). Los bugs más críticos aparecen en los bordes: datos inválidos, sin conexión a internet, sin permisos, campos vacíos, sesión expirada.",
    preguntaClave: "¿Probé qué pasa cuando el usuario comete un error, cuando falla la red, cuando los datos están incompletos?"
  },
  {
    id: "despliegue",
    numero: 5,
    nombre: "Despliegue / Liberación",
    icono: <Rocket className="h-6 w-6" />,
    color: "bg-rose-500",
    colorTexto: "text-rose-700",
    colorFondo: "bg-rose-50",
    resumen: "Poner el sistema en producción de forma controlada y sin sorpresas",
    quees: "El despliegue es el proceso de llevar el sistema del ambiente de desarrollo al ambiente de producción, donde los usuarios reales comenzarán a utilizarlo. Requiere planificación cuidadosa: migración de datos, configuración de infraestructura, capacitación de usuarios y un plan de rollback.",
    porque: "Un despliegue sin planificación puede interrumpir las operaciones del negocio, corromper datos existentes o dejar al sistema en un estado inusable. La presión del go-live hace que los equipos improvisen; un plan detallado convierte ese momento de tensión en un proceso predecible.",
    como: [
      "Preparar el plan de despliegue: lista de pasos en orden, responsables de cada uno, tiempos estimados",
      "Migrar los datos del sistema anterior al nuevo (si corresponde), verificando integridad",
      "Ejecutar el despliegue primero en un ambiente de staging (igual a producción) para detectar problemas",
      "Capacitar a los usuarios finales ANTES del go-live, no después — el día del lanzamiento no es para aprender",
      "Definir el plan de rollback: qué hacer si el sistema falla en producción y cómo volver al estado anterior",
      "Monitorear el sistema las primeras 24-72 horas post-lanzamiento con el equipo disponible"
    ],
    tecnicas: ["Plan de Despliegue paso a paso", "Ambiente de Staging", "Migración de Datos", "Plan de Rollback", "Capacitación de usuarios", "Monitoreo post go-live"],
    entregable: "Sistema funcionando en producción, manual de usuario entregado, checklist de despliegue completado",
    errorComun: "Desplegar directamente en producción sin un ambiente de pruebas equivalente. El ambiente de producción siempre tiene diferencias con el de desarrollo que nadie anticipó.",
    preguntaClave: "¿Tenemos un plan concreto para volver al estado anterior si el sistema falla el día del lanzamiento?"
  },
  {
    id: "mantenimiento",
    numero: 6,
    nombre: "Mantenimiento y Soporte",
    icono: <Users className="h-6 w-6" />,
    color: "bg-slate-500",
    colorTexto: "text-slate-700",
    colorFondo: "bg-slate-50",
    resumen: "Sostener y evolucionar el sistema durante toda su vida útil",
    quees: "El mantenimiento no es una fase final, sino la fase más larga del ciclo de vida. Incluye corrección de bugs encontrados en producción (correctivo), adaptación a cambios del entorno (adaptativo), implementación de mejoras solicitadas por usuarios (perfectivo) y optimizaciones preventivas (preventivo).",
    porque: "Estadísticamente, el 60-80% del costo total de un sistema se gasta después del lanzamiento, en mantenimiento. Un sistema sin estrategia de mantenimiento acumula deuda técnica y deuda de negocio hasta que se vuelve imposible de mantener. La trazabilidad entre requisitos y pruebas que generaste durante el proyecto es tu mayor activo en esta fase.",
    como: [
      "Establecer un canal claro para que los usuarios reporten problemas (mesa de ayuda, email, formulario)",
      "Priorizar los reportes: bugs críticos (el sistema no funciona) vs mejoras (el sistema funciona pero podría estar mejor)",
      "Documentar cada nuevo requisito como una nueva historia de usuario antes de implementarlo",
      "Ejecutar pruebas de regresión antes de cada actualización para no romper funcionalidades existentes",
      "Monitorear métricas: tiempo de respuesta, errores en logs, uso de recursos",
      "Planificar versiones o releases: agrupar cambios y comunicarlos al usuario con anticipación"
    ],
    tecnicas: ["Mesa de Ayuda / Help Desk", "Backlog de Mejoras", "Pruebas de Regresión", "Monitoreo de Logs", "Versionado Semántico", "Release Planning"],
    entregable: "Bugs corregidos documentados, nuevas historias de usuario para mejoras, métricas de uso y rendimiento del sistema",
    errorComun: "Implementar cambios en producción sin documentarlos ni probarlos ('lo toco rápido y listo'). Cada cambio no documentado es deuda futura: nadie sabe qué cambió, por qué, ni cómo deshacerlo si falla.",
    preguntaClave: "¿Cada cambio que hacemos está documentado como una nueva historia, probado con casos de prueba, y registrado en el historial del sistema?"
  }
]

const erroresComunes = [
  {
    error: "Saltearse el relevamiento",
    consecuencia: "Construís el sistema que vos imaginás, no el que el usuario necesita",
    solucion: "Siempre hablá con los usuarios finales antes de escribir un solo requisito",
    icono: <XCircle className="h-5 w-5 text-red-500" />,
  },
  {
    error: "Requisitos vagos sin criterios de aceptación",
    consecuencia: "Nadie sabe cuándo algo está 'listo', hay discusiones interminables",
    solucion: "Cada requisito debe tener al menos un criterio verificable: sabés cuándo está cumplido",
    icono: <XCircle className="h-5 w-5 text-red-500" />,
  },
  {
    error: "Diseñar y desarrollar todo antes de mostrarlo al cliente",
    consecuencia: "Meses de trabajo que el cliente rechaza porque no era lo que quería",
    solucion: "Mostrá prototipos y avances frecuentemente. El feedback temprano es barato",
    icono: <XCircle className="h-5 w-5 text-red-500" />,
  },
  {
    error: "Probar solo el camino feliz",
    consecuencia: "Los errores más comunes aparecen en producción, frente a usuarios reales",
    solucion: "Diseñá casos de prueba para escenarios negativos: datos inválidos, sin conexión, sin permisos",
    icono: <XCircle className="h-5 w-5 text-red-500" />,
  },
  {
    error: "No documentar el diseño",
    consecuencia: "El conocimiento queda en la cabeza de una sola persona, si se va se pierde todo",
    solucion: "Documentá arquitectura, modelo de datos y decisiones importantes mientras desarrollás",
    icono: <XCircle className="h-5 w-5 text-red-500" />,
  },
  {
    error: "Entregar sin capacitar a los usuarios",
    consecuencia: "El sistema se usa mal o directamente no se usa, tirando a la basura meses de trabajo",
    solucion: "La capacitación es parte del proyecto, no un extra opcional al final",
    icono: <XCircle className="h-5 w-5 text-red-500" />,
  },
]

const tecnicasClave = [
  {
    nombre: "Historias de Usuario",
    descripcion: "La forma más efectiva de capturar requisitos desde la perspectiva del usuario.",
    formato: 'Como [rol], quiero [acción], para [beneficio]',
    ejemplo: 'Como operador, quiero registrar la lectura del medidor con foto, para no tener que volver al mismo domicilio si hay un error.',
    cuando: "Fase de Análisis de Requisitos",
    icono: <FileText className="h-5 w-5" />,
    link: "/historias",
    linkText: "Crear Historias"
  },
  {
    nombre: "Criterios de Aceptación",
    descripcion: "Condiciones verificables que definen cuándo una historia está completamente lista.",
    formato: "El sistema [acción] cuando [condición], mostrando [resultado]",
    ejemplo: "El sistema guarda la lectura offline cuando no hay conexión y la sincroniza automáticamente cuando la conexión se restaura.",
    cuando: "Junto con cada Historia de Usuario",
    icono: <CheckCircle2 className="h-5 w-5" />,
    link: "/historias/nueva",
    linkText: "Nueva Historia"
  },
  {
    nombre: "Casos de Prueba (Gherkin)",
    descripcion: "Escenarios de prueba en lenguaje natural que cualquier persona del equipo puede entender y ejecutar.",
    formato: "Dado [contexto inicial] / Cuando [acción del usuario] / Entonces [resultado esperado]",
    ejemplo: "Dado que el operador está sin conexión a internet / Cuando registra una lectura de 00345 / Entonces el sistema guarda la lectura con estado 'Pendiente' y muestra un ícono de sincronización.",
    cuando: "Fase de Pruebas, basados en los criterios de aceptación",
    icono: <TestTube2 className="h-5 w-5" />,
    link: "/casos-prueba/nuevo",
    linkText: "Nuevo Caso de Prueba"
  },
  {
    nombre: "Priorización MoSCoW",
    descripcion: "Técnica para priorizar requisitos con el cliente y enfocarse en lo que realmente importa.",
    formato: "Must (imprescindible) / Should (importante) / Could (deseable) / Won't (fuera de alcance)",
    ejemplo: "Must: login y registro de lecturas. Should: historial de lecturas. Could: exportar a Excel. Won't: app Android nativa (por ahora).",
    cuando: "Fase de Análisis, para definir el alcance del primer release",
    icono: <Target className="h-5 w-5" />,
    link: "/proyectos",
    linkText: "Ver Proyectos"
  },
]

const methodologies: Methodology[] = [
  {
    id: "waterfall",
    name: "Cascada (Waterfall)",
    icon: <ArrowDown className="h-5 w-5" />,
    description: "Modelo secuencial donde cada fase debe completarse antes de iniciar la siguiente. Es lineal y predecible.",
    characteristics: [
      "Fases secuenciales y no superpuestas",
      "Documentación extensiva en cada fase",
      "Requisitos definidos al inicio y no cambian",
      "Entrega única al final del proyecto"
    ],
    advantages: [
      "Fácil de entender y gestionar",
      "Documentación completa",
      "Progreso fácil de medir",
      "Bueno para equipos con poca experiencia"
    ],
    disadvantages: [
      "Poco flexible ante cambios",
      "El cliente ve el producto hasta el final",
      "Errores se detectan tarde",
      "No apto para proyectos complejos o inciertos"
    ],
    bestFor: [
      "Proyectos pequeños con requisitos claros",
      "Sistemas regulados con documentación obligatoria",
      "Proyectos con presupuesto y tiempo fijos"
    ]
  },
  {
    id: "agile",
    name: "Ágil (Agile)",
    icon: <RefreshCcw className="h-5 w-5" />,
    description: "Enfoque iterativo e incremental que abraza el cambio. El trabajo se divide en iteraciones cortas llamadas sprints.",
    characteristics: [
      "Iteraciones cortas (1-4 semanas)",
      "Entrega incremental de valor",
      "Colaboración continua con el cliente",
      "Adaptación constante a cambios"
    ],
    advantages: [
      "Alta adaptabilidad al cambio",
      "Feedback temprano y continuo",
      "Entregas frecuentes de valor",
      "Mayor satisfacción del cliente"
    ],
    disadvantages: [
      "Requiere compromiso del cliente",
      "Difícil estimar tiempo y costo total",
      "Puede perder visión del objetivo final",
      "Requiere equipo experimentado y auto-organizado"
    ],
    bestFor: [
      "Proyectos con requisitos cambiantes",
      "Startups y productos nuevos",
      "Equipos pequeños y colaborativos",
      "Proyectos que necesitan time-to-market rápido"
    ]
  },
  {
    id: "scrum",
    name: "Scrum",
    icon: <Layers className="h-5 w-5" />,
    description: "Framework ágil con roles definidos, ceremonias y artefactos. Organiza el trabajo en sprints de duración fija.",
    characteristics: [
      "Sprints de 2-4 semanas",
      "Roles: Product Owner, Scrum Master, Dev Team",
      "Ceremonias: Daily, Planning, Review, Retro",
      "Artefactos: Product Backlog, Sprint Backlog, Incremento"
    ],
    advantages: [
      "Estructura clara dentro de la agilidad",
      "Transparencia y visibilidad del progreso",
      "Mejora continua integrada",
      "Equipos auto-organizados y empoderados"
    ],
    disadvantages: [
      "Requiere compromiso total del equipo",
      "Scrum Master y PO deben ser capacitados",
      "No funciona bien con equipos distribuidos sin herramientas",
      "Puede ser rígido en las ceremonias"
    ],
    bestFor: [
      "Equipos de desarrollo de software",
      "Proyectos con entregables incrementales",
      "Organizaciones que buscan transformación ágil"
    ]
  },
  {
    id: "kanban",
    name: "Kanban",
    icon: <GitBranch className="h-5 w-5" />,
    description: "Sistema visual de gestión del flujo de trabajo. Se enfoca en limitar el trabajo en progreso y optimizar el flujo.",
    characteristics: [
      "Tablero visual con columnas de estado",
      "Límites de trabajo en progreso (WIP)",
      "Flujo continuo sin iteraciones fijas",
      "Métricas de lead time y cycle time"
    ],
    advantages: [
      "Muy flexible y fácil de implementar",
      "Visualización clara del trabajo",
      "Identifica cuellos de botella",
      "No requiere cambios organizacionales grandes"
    ],
    disadvantages: [
      "Puede faltar estructura para algunos equipos",
      "Sin timeboxing, puede faltar urgencia",
      "Requiere disciplina para respetar WIP limits",
      "Menos prescriptivo que Scrum"
    ],
    bestFor: [
      "Equipos de soporte y operaciones",
      "Proyectos con trabajo continuo (no proyectos)",
      "Equipos que ya tienen otro proceso y quieren mejorarlo"
    ]
  }
]

// ─── Datos: Flujo de Trabajo ──────────────────────────────────────────────────

interface WorkflowStep {
  number: number
  title: string
  description: string
  icon: React.ReactNode
  why: string
  howTo: string[]
  tips: string[]
  warnings?: string[]
  link: string
  linkText: string
}

const workflowSteps: WorkflowStep[] = [
  {
    number: 1,
    title: "Crear un Proyecto",
    description: "Todo comienza con un proyecto que agrupa el trabajo de desarrollo.",
    icon: <FolderKanban className="h-6 w-6" />,
    why: "El proyecto es el contenedor principal que organiza todo el trabajo. Sin un proyecto, no podés crear módulos, historias de usuario ni casos de prueba. Pensalo como la carpeta raíz de tu documentación.",
    howTo: [
      "Ve a la sección 'Proyectos' en el menú lateral",
      "Hacé clic en 'Nuevo Proyecto'",
      "Completá el nombre, descripción y seleccioná la prioridad",
      "Guardá el proyecto"
    ],
    tips: [
      "Usá nombres descriptivos que identifiquen claramente el sistema o aplicación",
      "La descripción debe explicar el objetivo general del proyecto",
      "Podés tener múltiples proyectos activos simultáneamente"
    ],
    link: "/proyectos",
    linkText: "Ir a Proyectos"
  },
  {
    number: 2,
    title: "Definir Módulos",
    description: "Dividí el proyecto en módulos funcionales para organizar mejor el trabajo.",
    icon: <Layers className="h-6 w-6" />,
    why: "Los módulos representan las grandes áreas funcionales de tu sistema. Por ejemplo: 'Autenticación', 'Gestión de Usuarios', 'Reportes'. Esta división facilita la organización y permite que diferentes equipos trabajen en paralelo.",
    howTo: [
      "Abrí el detalle de un proyecto existente",
      "En la sección de módulos, hacé clic en 'Agregar Módulo'",
      "Definí el nombre y descripción del módulo",
      "El módulo quedará vinculado automáticamente al proyecto"
    ],
    tips: [
      "Identificá los módulos según las funcionalidades principales del negocio",
      "Un módulo debe ser lo suficientemente grande para contener varias historias de usuario",
      "Evitá módulos demasiado pequeños o demasiado grandes"
    ],
    warnings: [
      "No crees módulos antes de tener claro el alcance del proyecto"
    ],
    link: "/proyectos",
    linkText: "Ver Proyectos"
  },
  {
    number: 3,
    title: "Escribir Historias de Usuario",
    description: "Documentá los requisitos desde la perspectiva del usuario final.",
    icon: <FileText className="h-6 w-6" />,
    why: "Las historias de usuario son la forma más efectiva de capturar requisitos porque se centran en el valor para el usuario. El formato 'Como [rol], quiero [acción], para [beneficio]' asegura que siempre documentamos el propósito detrás de cada funcionalidad.",
    howTo: [
      "Ve a 'Historias de Usuario' y hacé clic en 'Nueva Historia'",
      "Seleccioná el proyecto y módulo correspondiente",
      "Completá el formato: Como [rol], Quiero [acción], Para [beneficio]",
      "Agregá los criterios de aceptación que definen cuándo está completa"
    ],
    tips: [
      "Los criterios de aceptación deben ser verificables y específicos",
      "Una buena historia de usuario es pequeña y entregable en un sprint",
      "Incluí criterios de aceptación para casos edge y errores"
    ],
    warnings: [
      "Una historia sin criterios de aceptación no puede considerarse completa",
      "Evitá historias demasiado técnicas — enfocate en el valor de negocio"
    ],
    link: "/historias",
    linkText: "Ir a Historias"
  },
  {
    number: 4,
    title: "Crear Casos de Prueba",
    description: "Definí cómo verificar que cada historia de usuario funciona correctamente.",
    icon: <FlaskConical className="h-6 w-6" />,
    why: "Los casos de prueba son la garantía de calidad. Sin ellos, no hay forma objetiva de verificar que el desarrollo cumple con los requisitos. Una historia no puede marcarse como 'Done' sin al menos un caso de prueba aprobado.",
    howTo: [
      "Ve a 'Casos de Prueba' y hacé clic en 'Nuevo Caso'",
      "Vinculá el caso de prueba a una historia de usuario existente",
      "Usá el formato Gherkin: Dado [contexto], Cuando [acción], Entonces [resultado]",
      "Definí los pasos detallados y el resultado esperado"
    ],
    tips: [
      "Cada criterio de aceptación debería tener al menos un caso de prueba",
      "Incluí casos de prueba para escenarios positivos y negativos",
      "Los pasos deben ser reproducibles por cualquier persona del equipo"
    ],
    warnings: [
      "No marques una historia como 'Done' sin casos de prueba aprobados",
      "Un caso de prueba fallido bloquea el cierre de la historia"
    ],
    link: "/casos-prueba",
    linkText: "Ir a Casos de Prueba"
  },
  {
    number: 5,
    title: "Ejecutar y Actualizar Estados",
    description: "Seguí el flujo de estados para mantener la trazabilidad actualizada.",
    icon: <CheckSquare className="h-6 w-6" />,
    why: "El flujo de estados (Backlog → In Progress → Testing → Done) refleja el ciclo de vida real del desarrollo. Mantener los estados actualizados permite al equipo saber exactamente qué está pasando y detectar cuellos de botella.",
    howTo: [
      "Las historias nuevas comienzan en 'Backlog'",
      "Cuando inicia el desarrollo, movela a 'In Progress'",
      "Al terminar el desarrollo, pasá a 'Testing'",
      "Solo cuando los casos de prueba pasen, marcá como 'Done'"
    ],
    tips: [
      "Actualizá los estados en tiempo real para mantener visibilidad",
      "El Dashboard muestra métricas basadas en estos estados",
      "Los casos de prueba tienen su propio flujo: Pending → Passed / Failed / Blocked"
    ],
    warnings: [
      "Una historia no puede pasar a 'Done' si tiene casos de prueba en 'Failed' o 'Blocked'"
    ],
    link: "/historias",
    linkText: "Ver Estados"
  },
  {
    number: 6,
    title: "Revisar la Matriz de Trazabilidad",
    description: "Verificá que cada requisito tiene cobertura de pruebas adecuada.",
    icon: <GitBranch className="h-6 w-6" />,
    why: "La matriz de trazabilidad es tu herramienta de auditoría. Muestra la relación entre historias de usuario y casos de prueba, permitiendo identificar requisitos sin cobertura y asegurar que nada se quede sin probar.",
    howTo: [
      "Ve a la sección 'Trazabilidad' en el menú",
      "Seleccioná el proyecto que querés analizar",
      "Revisá la matriz que cruza historias con casos de prueba",
      "Identificá historias sin casos de prueba (celdas vacías)"
    ],
    tips: [
      "Una buena cobertura tiene al menos 2-3 casos de prueba por historia",
      "Prestá atención a las historias de alta prioridad sin cobertura",
      "Usá la matriz antes de cada release para validar completitud"
    ],
    link: "/trazabilidad",
    linkText: "Ver Matriz"
  }
]

function WorkflowStepCard({ step, isExpanded, onToggle }: { step: WorkflowStep; isExpanded: boolean; onToggle: () => void }) {
  return (
    <Card className={cn("transition-all duration-200", isExpanded && "ring-2 ring-primary/20")}>
      <Collapsible open={isExpanded} onOpenChange={onToggle}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                {step.icon}
              </div>
              <div className="flex-1">
                <Badge variant="outline" className="text-xs mb-1">Paso {step.number}</Badge>
                <CardTitle className="mt-1">{step.title}</CardTitle>
                <CardDescription className="mt-1">{step.description}</CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="shrink-0">
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="ml-16 space-y-5">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                  <Lightbulb className="h-4 w-4" />
                  ¿Por qué es importante?
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.why}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <BookOpen className="h-4 w-4" />
                  Cómo hacerlo
                </div>
                <ol className="space-y-1.5">
                  {step.howTo.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">{i + 1}</span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  Consejos
                </div>
                <ul className="space-y-1">
                  {step.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-green-600">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
              {step.warnings && step.warnings.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-amber-600">
                    <AlertTriangle className="h-4 w-4" />
                    Precauciones
                  </div>
                  <ul className="space-y-1">
                    {step.warnings.map((w, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-amber-600">•</span>
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="pt-1">
                <Button asChild>
                  <Link href={step.link}>
                    {step.linkText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}

// ─── Componentes ──────────────────────────────────────────────────────────────

function TarjetaEtapa({ etapa, seleccionada, onClick }: { etapa: Etapa; seleccionada: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition-all text-center w-full",
        seleccionada
          ? "border-primary bg-primary/5 shadow-md scale-[1.02]"
          : "border-border hover:border-primary/40 hover:bg-muted/30"
      )}
    >
      <div className={cn("flex h-10 w-10 items-center justify-center rounded-full text-white shrink-0", etapa.color)}>
        {etapa.icono}
      </div>
      <div>
        <div className="text-xs text-muted-foreground">Etapa {etapa.numero}</div>
        <div className="text-xs font-semibold leading-tight">{etapa.nombre}</div>
      </div>
    </button>
  )
}

function DetalleEtapa({ etapa }: { etapa: Etapa }) {
  return (
    <Card className="border-2 transition-all">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className={cn("flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-white", etapa.color)}>
            {etapa.icono}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-1">
              <Badge variant="outline">Etapa {etapa.numero} de 6</Badge>
            </div>
            <CardTitle>{etapa.nombre}</CardTitle>
            <CardDescription className="mt-1">{etapa.resumen}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Pregunta clave */}
        <div className={cn("rounded-lg border p-4", etapa.colorFondo)}>
          <div className={cn("flex items-center gap-2 text-sm font-semibold mb-1", etapa.colorTexto)}>
            <MessageSquare className="h-4 w-4" />
            Pregunta clave de esta etapa
          </div>
          <p className="text-sm font-medium">{etapa.preguntaClave}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Qué es */}
          <div className="space-y-2">
            <h4 className="flex items-center gap-2 text-sm font-semibold">
              <Eye className="h-4 w-4 text-primary" />
              ¿Qué es?
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{etapa.quees}</p>
          </div>

          {/* Por qué */}
          <div className="space-y-2">
            <h4 className="flex items-center gap-2 text-sm font-semibold">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              ¿Por qué es crucial?
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{etapa.porque}</p>
          </div>

          {/* Cómo hacerlo */}
          <div className="space-y-2">
            <h4 className="flex items-center gap-2 text-sm font-semibold">
              <BookOpen className="h-4 w-4 text-blue-500" />
              ¿Cómo se hace?
            </h4>
            <ol className="space-y-1.5">
              {etapa.como.map((paso, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                    {i + 1}
                  </span>
                  {paso}
                </li>
              ))}
            </ol>
          </div>

          {/* Técnicas */}
          <div className="space-y-2">
            <h4 className="flex items-center gap-2 text-sm font-semibold">
              <Wrench className="h-4 w-4 text-purple-500" />
              Técnicas y herramientas
            </h4>
            <div className="flex flex-wrap gap-2">
              {etapa.tecnicas.map((t, i) => (
                <Badge key={i} variant="secondary" className="text-xs">{t}</Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Entregable */}
        <div className="flex items-start gap-3 rounded-lg bg-green-50 border border-green-200 p-3">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600 mt-0.5" />
          <div>
            <div className="text-sm font-semibold text-green-700">Entregable de esta etapa</div>
            <div className="text-sm text-muted-foreground">{etapa.entregable}</div>
          </div>
        </div>

        {/* Error común */}
        <div className="flex items-start gap-3 rounded-lg bg-red-50 border border-red-200 p-3">
          <AlertTriangle className="h-5 w-5 shrink-0 text-red-500 mt-0.5" />
          <div>
            <div className="text-sm font-semibold text-red-700">Error más común en esta etapa</div>
            <div className="text-sm text-muted-foreground">{etapa.errorComun}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Componente Principal ─────────────────────────────────────────────────────

export function LearnContent() {
  const [etapaSeleccionada, setEtapaSeleccionada] = useState<Etapa>(etapas[0])
  const [expandedStep, setExpandedStep] = useState<number | null>(1)

  return (
    <div className="space-y-8">

      {/* Intro */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            El ciclo de vida completo de un sistema
          </CardTitle>
          <CardDescription className="text-base">
            Desde la idea hasta el mantenimiento: las 6 fases del SDLC con foco en <strong>cómo aplicarlas en la práctica</strong>, qué metodología elegir según el proyecto, y los errores más costosos que podés evitar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="flex items-start gap-3 rounded-lg border bg-card p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 shrink-0">
                <span className="text-sm font-bold text-primary">6</span>
              </div>
              <div>
                <div className="text-sm font-semibold">Fases del proceso</div>
                <div className="text-xs text-muted-foreground">Técnicas concretas para cada etapa</div>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border bg-card p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500/10 shrink-0">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              </div>
              <div>
                <div className="text-sm font-semibold">Errores frecuentes</div>
                <div className="text-xs text-muted-foreground">Los más costosos y cómo evitarlos</div>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border bg-card p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500/10 shrink-0">
                <Layers className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <div className="text-sm font-semibold">Metodologías</div>
                <div className="text-xs text-muted-foreground">Waterfall, Agile, Scrum y Kanban</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="proceso" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="proceso">
            <ChevronRight className="mr-1 h-4 w-4" />
            Las 6 Fases
          </TabsTrigger>
          <TabsTrigger value="tecnicas">
            <Wrench className="mr-1 h-4 w-4" />
            Técnicas
          </TabsTrigger>
          <TabsTrigger value="metodologias">
            <Layers className="mr-1 h-4 w-4" />
            Metodologías
          </TabsTrigger>
          <TabsTrigger value="errores">
            <AlertTriangle className="mr-1 h-4 w-4" />
            Errores
          </TabsTrigger>
          <TabsTrigger value="flujo">
            <FolderKanban className="mr-1 h-4 w-4" />
            Flujo de Trabajo
          </TabsTrigger>
        </TabsList>

        {/* ── Tab 1: El Proceso ── */}
        <TabsContent value="proceso" className="space-y-6 pt-4">
          <div>
            <h2 className="text-lg font-semibold">Las 6 fases del desarrollo — en la práctica</h2>
            <p className="text-sm text-muted-foreground">Hacé clic en cada fase para ver cómo hacerla concretamente, qué técnicas usar y qué errores evitar</p>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
            {etapas.map((etapa) => (
              <TarjetaEtapa
                key={etapa.id}
                etapa={etapa}
                seleccionada={etapaSeleccionada.id === etapa.id}
                onClick={() => setEtapaSeleccionada(etapa)}
              />
            ))}
          </div>

          <DetalleEtapa etapa={etapaSeleccionada} />

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => {
                const idx = etapas.findIndex(e => e.id === etapaSeleccionada.id)
                if (idx > 0) setEtapaSeleccionada(etapas[idx - 1])
              }}
              disabled={etapaSeleccionada.numero === 1}
            >
              ← Etapa anterior
            </Button>
            <span className="text-sm text-muted-foreground">
              {etapaSeleccionada.numero} de {etapas.length}
            </span>
            <Button
              variant="outline"
              onClick={() => {
                const idx = etapas.findIndex(e => e.id === etapaSeleccionada.id)
                if (idx < etapas.length - 1) setEtapaSeleccionada(etapas[idx + 1])
              }}
              disabled={etapaSeleccionada.numero === etapas.length}
            >
              Etapa siguiente →
            </Button>
          </div>
        </TabsContent>

        {/* ── Tab 2: Técnicas Clave ── */}
        <TabsContent value="tecnicas" className="space-y-6 pt-4">
          <div>
            <h2 className="text-lg font-semibold">Técnicas fundamentales</h2>
            <p className="text-sm text-muted-foreground">Las herramientas más usadas en el análisis y la documentación de sistemas</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {tecnicasClave.map((tecnica) => (
              <Card key={tecnica.nombre} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {tecnica.icono}
                    </div>
                    {tecnica.nombre}
                  </CardTitle>
                  <CardDescription>{tecnica.descripcion}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Formato</div>
                    <div className="rounded-md bg-muted px-3 py-2 font-mono text-xs leading-relaxed">
                      {tecnica.formato}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Ejemplo concreto</div>
                    <div className="rounded-md border bg-card px-3 py-2 text-xs text-muted-foreground leading-relaxed italic">
                      "{tecnica.ejemplo}"
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      Usar en: {tecnica.cuando}
                    </Badge>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={tecnica.link}>
                        {tecnica.linkText}
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <GitBranch className="h-5 w-5 text-primary" />
                Cómo conecta con RQA-Tracer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500 mt-0.5" />
                  <span className="text-muted-foreground"><strong>Análisis →</strong> Creás Proyectos, Módulos e Historias de Usuario con criterios de aceptación</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500 mt-0.5" />
                  <span className="text-muted-foreground"><strong>Pruebas →</strong> Creás Casos de Prueba en formato Gherkin vinculados a cada Historia</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500 mt-0.5" />
                  <span className="text-muted-foreground"><strong>Trazabilidad →</strong> La Matriz te muestra qué historias tienen cobertura y cuáles no</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Tab 3: Metodologías ── */}
        <TabsContent value="metodologias" className="space-y-6 pt-4">
          <div>
            <h2 className="text-lg font-semibold">Metodologías de Desarrollo</h2>
            <p className="text-sm text-muted-foreground">Diferentes enfoques para organizar el trabajo del equipo — elegí el que mejor se adapte a tu proyecto</p>
          </div>

          <Tabs defaultValue="waterfall" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
              {methodologies.map((method) => (
                <TabsTrigger key={method.id} value={method.id} className="flex items-center gap-2">
                  {method.icon}
                  <span className="hidden sm:inline">{method.name}</span>
                  <span className="sm:hidden">{method.name.split(' ')[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {methodologies.map((method) => (
              <TabsContent key={method.id} value={method.id}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {method.icon}
                      {method.name}
                    </CardTitle>
                    <CardDescription>{method.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 lg:grid-cols-2">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Características</h4>
                          <ul className="space-y-1">
                            {method.characteristics.map((char, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="text-primary">•</span>
                                {char}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-2">
                          <h4 className="flex items-center gap-1 text-sm font-medium text-green-600">
                            <CheckCircle2 className="h-4 w-4" />
                            Ventajas
                          </h4>
                          <ul className="space-y-1">
                            {method.advantages.map((adv, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="text-green-600">+</span>
                                {adv}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="flex items-center gap-1 text-sm font-medium text-amber-600">
                            <AlertCircle className="h-4 w-4" />
                            Desventajas
                          </h4>
                          <ul className="space-y-1">
                            {method.disadvantages.map((dis, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="text-amber-600">-</span>
                                {dis}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-2">
                          <h4 className="flex items-center gap-1 text-sm font-medium text-primary">
                            <TrendingUp className="h-4 w-4" />
                            Ideal Para
                          </h4>
                          <ul className="space-y-1">
                            {method.bestFor.map((best, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="text-primary">→</span>
                                {best}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </TabsContent>

        {/* ── Tab 4: Errores Frecuentes ── */}
        <TabsContent value="errores" className="space-y-6 pt-4">
          <div>
            <h2 className="text-lg font-semibold">Errores más costosos en el desarrollo de sistemas</h2>
            <p className="text-sm text-muted-foreground">Aprender de los errores ajenos es más barato que aprenderlo por las propias</p>
          </div>

          <div className="space-y-4">
            {erroresComunes.map((item, i) => (
              <Card key={i} className="border-red-200/60">
                <CardContent className="pt-5">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm font-semibold text-red-600">
                        {item.icono}
                        Error: {item.error}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Consecuencia</div>
                      <p className="text-sm text-muted-foreground">{item.consecuencia}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-xs font-semibold text-green-700 uppercase tracking-wide">
                        <CheckCircle2 className="h-3 w-3" />
                        Cómo evitarlo
                      </div>
                      <p className="text-sm text-muted-foreground">{item.solucion}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-amber-500/30 bg-amber-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-700">
                <Lightbulb className="h-5 w-5" />
                La regla de oro
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">
                <strong>El costo de corregir un error crece exponencialmente cuanto más tarde se detecta.</strong>
                {" "}Corregir un requisito mal entendido en la fase de análisis cuesta 1x. El mismo error detectado durante el desarrollo cuesta 10x. En producción, cuesta 100x o más.
              </p>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Por eso las pruebas, la validación con el usuario y la documentación no son costos opcionales: son inversiones que reducen el riesgo total del proyecto.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Tab 5: Flujo de Trabajo en RQA-Tracer ── */}
        <TabsContent value="flujo" className="space-y-6 pt-4">
          <div>
            <h2 className="text-lg font-semibold">Cómo usar RQA-Tracer paso a paso</h2>
            <p className="text-sm text-muted-foreground">Seguí este flujo para documentar requisitos y asegurar la calidad de tus proyectos</p>
          </div>

          {/* Flujo visual */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Flujo de Trabajo</CardTitle>
              <CardDescription>Hacé clic en cada paso para ir directo a ese punto del flujo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {workflowSteps.map((step, index) => (
                  <div key={step.number} className="flex items-center gap-2">
                    <button
                      onClick={() => setExpandedStep(step.number)}
                      className={cn(
                        "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                        expandedStep === step.number
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted hover:bg-muted/80"
                      )}
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-background/20 text-xs">
                        {step.number}
                      </span>
                      <span className="hidden sm:inline">{step.title}</span>
                    </button>
                    {index < workflowSteps.length - 1 && (
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pasos detallados */}
          <div className="space-y-4">
            {workflowSteps.map((step) => (
              <WorkflowStepCard
                key={step.number}
                step={step}
                isExpanded={expandedStep === step.number}
                onToggle={() => setExpandedStep(expandedStep === step.number ? null : step.number)}
              />
            ))}
          </div>

          {/* Regla de negocio clave */}
          <Card className="border-amber-500/20 bg-amber-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-600">
                <AlertTriangle className="h-5 w-5" />
                Regla de Negocio Clave
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">
                <strong>Una Historia de Usuario no puede marcarse como &quot;Done&quot; hasta que tenga al menos un Caso de Prueba con estado &quot;Passed&quot;.</strong>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Esta regla garantiza que cada funcionalidad entregada ha sido verificada y cumple con los criterios de aceptación definidos. Es la base de la trazabilidad entre requisitos y pruebas.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Consejos para el Éxito */}
      <Card className="border-green-500/20 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700">
            <Lightbulb className="h-5 w-5" />
            Consejos para el Éxito
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-start gap-3">
              <MessageSquare className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
              <div>
                <div className="text-sm font-medium">Comunicación Constante</div>
                <div className="text-xs text-muted-foreground">Mantén al equipo y stakeholders informados en todo momento</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FileEdit className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
              <div>
                <div className="text-sm font-medium">Documentación Clara</div>
                <div className="text-xs text-muted-foreground">Documenta decisiones, requisitos y cambios importantes</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <TestTube2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
              <div>
                <div className="text-sm font-medium">Pruebas Tempranas</div>
                <div className="text-xs text-muted-foreground">Detectar errores temprano es más barato que corregirlos después</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
              <div>
                <div className="text-sm font-medium">Involucra al Usuario</div>
                <div className="text-xs text-muted-foreground">El feedback del usuario final es invaluable</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
              <div>
                <div className="text-sm font-medium">Planifica con Margen</div>
                <div className="text-xs text-muted-foreground">Siempre ocurren imprevistos, planifica buffer de tiempo</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <RefreshCcw className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
              <div>
                <div className="text-sm font-medium">Mejora Continua</div>
                <div className="text-xs text-muted-foreground">Aprende de cada proyecto y aplica las lecciones</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA final */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold">¿Listo para practicar?</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Aplicá lo aprendido creando tu primer proyecto en RQA-Tracer
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline">
                <Link href="/aprender?tab=flujo">Ver flujo de trabajo</Link>
              </Button>
              <Button asChild>
                <Link href="/proyectos">
                  Crear mi primer proyecto
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
