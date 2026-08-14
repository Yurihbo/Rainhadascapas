# Oracle Cloud Always Free — fontes consultadas

## Recursos Always Free
Fonte: https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm

A Oracle informa que os recursos Always Free ficam disponíveis na home region da tenancy durante a vida da conta. A documentação atual lista VMs Micro AMD e recursos Ampere A1 Flex, além de armazenamento de bloco, IP público e recursos de rede. A Oracle também alerta que VMs Always Free ociosas podem ser reclamadas quando, por sete dias, CPU, rede e memória ficam abaixo dos limites definidos.

## Criação de VM Linux
Fonte: https://docs.oracle.com/iaas/Content/Compute/tutorials/first-linux-instance/overview.htm

O tutorial oficial usa compartment, VCN, subnet pública com internet gateway, criação da instância e conexão por SSH. A criação da instância pode gerar ou receber um par de chaves SSH.

## Acesso SSH
Fonte: https://docs.oracle.com/en-us/iaas/Content/Compute/Tasks/connect-to-linux-instance.htm

Para Ubuntu, o usuário padrão é `ubuntu`; para Oracle Linux, normalmente `opc`. O acesso exige o IP público e a chave privada correspondente. Em Linux/macOS, a documentação orienta `chmod 400` na chave privada antes de executar `ssh -i`.

## Regras de segurança
Fonte: https://docs.oracle.com/en-us/iaas/Content/Network/Concepts/securityrules.htm

A rede usa security lists ou Network Security Groups para controlar tráfego. A Oracle recomenda NSGs para separar posturas de segurança e alerta que as regras da rede precisam estar alinhadas com o firewall do sistema operacional. Para publicar o app, normalmente serão necessários HTTP/HTTPS e SSH restrito ao IP administrativo.
