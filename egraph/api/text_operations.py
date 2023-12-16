

def FormatNode(node: dict) -> dict:
    return {
        "id": node['id'],
        "position": node['position'],
        "name": node["data"]["name"],
        "attr": node["data"]["name"][:1],
        "population": node["data"]["population"],
    }


def NodesToJson(nodes: list) -> list:
    result_nodes: list = []
    for node in nodes:
        result_nodes.append(FormatNode(node))
    return result_nodes