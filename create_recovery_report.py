from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak

out = "/home/ubuntu/rainhadascapas-investigation/estoque_recuperavel_2026-08-27.pdf"
doc = SimpleDocTemplate(out, pagesize=A4, rightMargin=16*mm, leftMargin=16*mm, topMargin=15*mm, bottomMargin=15*mm)
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="TitleGold", parent=styles["Title"], alignment=TA_CENTER, textColor=colors.HexColor("#9b7717"), fontSize=20, leading=24, spaceAfter=8))
styles.add(ParagraphStyle(name="Small", parent=styles["BodyText"], fontSize=8.5, leading=11, textColor=colors.HexColor("#444444")))
styles.add(ParagraphStyle(name="Section", parent=styles["Heading2"], textColor=colors.HexColor("#9b7717"), spaceBefore=10, spaceAfter=6))
styles.add(ParagraphStyle(name="Warning", parent=styles["BodyText"], backColor=colors.HexColor("#fff4d6"), borderColor=colors.HexColor("#d2a62a"), borderWidth=0.6, borderPadding=7, leading=14))

story = []
story.append(Paragraph("RAINHA DAS CAPAS", styles["TitleGold"]))
story.append(Paragraph("Relatório de dados recuperáveis no Firestore", styles["Heading2"]))
story.append(Paragraph("Emissão: 27/08/2026 · Projeto: rainhadascapas-5a49a · Documento: sharedWorkspaces/main", styles["Small"]))
story.append(Spacer(1, 8))
story.append(Paragraph("<b>Resultado da auditoria:</b> o documento compartilhado ainda existe e não está vazio. Esta exportação contém todos os dados que foram visualizados com segurança no documento atual durante a investigação.", styles["BodyText"]))
story.append(Spacer(1, 8))
story.append(Paragraph("Atenção sobre os dados ausentes", styles["Section"]))
story.append(Paragraph("O documento atual apresenta 1 revendedor e 3 lançamentos. O Firebase Analytics não disponibiliza o conteúdo de revendedores ou itens; além disso, o painel Analytics do projeto informa que não há um app configurado para eventos. Portanto, não é possível gerar honestamente um PDF com os aproximadamente 20 revendedores e 400 lançamentos apenas a partir das métricas de uso. Esses dados somente poderão ser reconstruídos por backup/exportação anterior ou por cache local de algum dispositivo.", styles["Warning"]))
story.append(Spacer(1, 8))
story.append(Paragraph("Resumo recuperado", styles["Section"]))
summary = [["Revendedores", "Itens", "Total", "Status"], ["1", "3", "R$ 350,00", "Pendente"]]
t = Table(summary, colWidths=[35*mm, 25*mm, 40*mm, 35*mm])
t.setStyle(TableStyle([("BACKGROUND", (0,0), (-1,0), colors.HexColor("#f0e6c6")), ("TEXTCOLOR", (0,0), (-1,0), colors.HexColor("#5d4810")), ("GRID", (0,0), (-1,-1), 0.4, colors.HexColor("#c9b986")), ("FONTNAME", (0,0), (-1,0), "Helvetica-Bold"), ("ALIGN", (0,0), (-1,-1), "CENTER"), ("VALIGN", (0,0), (-1,-1), "MIDDLE"), ("BOTTOMPADDING", (0,0), (-1,-1), 7), ("TOPPADDING", (0,0), (-1,-1), 7)]))
story.append(t)
story.append(Spacer(1, 10))
story.append(Paragraph("Lista de revendedores recuperada", styles["Section"]))
sellers = [["Revendedor", "Telefone", "Situação", "Total", "Atualização"], ["João Carlos", "(11) 98824-1740", "Pendente", "R$ 350,00", "Hoje, 09:42"]]
t = Table(sellers, colWidths=[37*mm, 40*mm, 26*mm, 27*mm, 32*mm], repeatRows=1)
t.setStyle(TableStyle([("BACKGROUND", (0,0), (-1,0), colors.HexColor("#f0e6c6")), ("TEXTCOLOR", (0,0), (-1,0), colors.HexColor("#5d4810")), ("GRID", (0,0), (-1,-1), 0.4, colors.HexColor("#c9b986")), ("FONTNAME", (0,0), (-1,0), "Helvetica-Bold"), ("FONTSIZE", (0,0), (-1,-1), 8), ("VALIGN", (0,0), (-1,-1), "MIDDLE"), ("BOTTOMPADDING", (0,0), (-1,-1), 7), ("TOPPADDING", (0,0), (-1,-1), 7)]))
story.append(t)
story.append(Spacer(1, 10))
story.append(Paragraph("Lançamentos do revendedor", styles["Section"]))
items = [["Item", "Qtd.", "Unitário", "Total", "Data"], ["Película iPhone 11", "5", "R$ 15,00", "R$ 75,00", "14 ago"], ["Capa iPhone 11", "10", "R$ 18,00", "R$ 180,00", "14 ago"], ["Carregador Turbo", "2", "R$ 45,00", "R$ 90,00", "13 ago"]]
t = Table(items, colWidths=[62*mm, 18*mm, 30*mm, 30*mm, 25*mm], repeatRows=1)
t.setStyle(TableStyle([("BACKGROUND", (0,0), (-1,0), colors.HexColor("#f0e6c6")), ("TEXTCOLOR", (0,0), (-1,0), colors.HexColor("#5d4810")), ("GRID", (0,0), (-1,-1), 0.4, colors.HexColor("#c9b986")), ("FONTNAME", (0,0), (-1,0), "Helvetica-Bold"), ("FONTSIZE", (0,0), (-1,-1), 8.5), ("ALIGN", (1,1), (-1,-1), "CENTER"), ("BOTTOMPADDING", (0,0), (-1,-1), 7), ("TOPPADDING", (0,0), (-1,-1), 7)]))
story.append(t)
story.append(Spacer(1, 14))
story.append(Paragraph("Evidências técnicas", styles["Section"]))
story.append(Paragraph("Firestore Usage exibiu 77 leituras, 26 gravações e nenhuma exclusão no período recente consultado. O documento informou updatedAt 1787829571006 e updatedBy dQBZR1uJo9XrqBmRCU2KkfR3u0t2. Esses números demonstram atividade, mas não preservam o conteúdo histórico de cada gravação.", styles["Small"]))
story.append(Spacer(1, 10))
story.append(Paragraph("Não editar, excluir ou limpar o cache dos dispositivos antes de procurar uma cópia local ou exportação anterior. Este relatório é uma fotografia do estado atual, não uma restauração do estado histórico.", styles["Warning"]))
doc.build(story)
print(out)
