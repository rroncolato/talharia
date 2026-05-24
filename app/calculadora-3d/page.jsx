import Calculadora3D from "@/components/Calculadora3D";

export const metadata = {
  title: "Calculadora de Custos 3D | Estúdio Roncolato",
  description:
    "Calcule o custo real de cada impressão 3D: filamento, energia, depreciação, embalagem e margem de lucro.",
};

export default function CalculadoraPage() {
  return <Calculadora3D />;
}
