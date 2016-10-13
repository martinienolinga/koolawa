<?php

/* KoolawaAppsBundle:Workspace:workspace.html.twig */
class __TwigTemplate_6a3f8767af962dd0186c3b63774fbf65525dfb8c7cdb9086e1e5bcf5578b6fc4 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 3
        $this->parent = $this->loadTemplate("KoolawaCoreBundle::layout.html.twig", "KoolawaAppsBundle:Workspace:workspace.html.twig", 3);
        $this->blocks = array(
            'head' => array($this, 'block_head'),
            'body' => array($this, 'block_body'),
        );
    }

    protected function doGetParent(array $context)
    {
        return "KoolawaCoreBundle::layout.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_ea96baba35f0093093cf366edf25a7855a3eab7df46af5cd4dd93f5cd52f7a76 = $this->env->getExtension("native_profiler");
        $__internal_ea96baba35f0093093cf366edf25a7855a3eab7df46af5cd4dd93f5cd52f7a76->enter($__internal_ea96baba35f0093093cf366edf25a7855a3eab7df46af5cd4dd93f5cd52f7a76_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "KoolawaAppsBundle:Workspace:workspace.html.twig"));

        $this->parent->display($context, array_merge($this->blocks, $blocks));
        
        $__internal_ea96baba35f0093093cf366edf25a7855a3eab7df46af5cd4dd93f5cd52f7a76->leave($__internal_ea96baba35f0093093cf366edf25a7855a3eab7df46af5cd4dd93f5cd52f7a76_prof);

    }

    // line 5
    public function block_head($context, array $blocks = array())
    {
        $__internal_af4fcee1e6c40db7aa545d8c1ff3367e36c4a74e53b16b92c34c738a02d7273c = $this->env->getExtension("native_profiler");
        $__internal_af4fcee1e6c40db7aa545d8c1ff3367e36c4a74e53b16b92c34c738a02d7273c->enter($__internal_af4fcee1e6c40db7aa545d8c1ff3367e36c4a74e53b16b92c34c738a02d7273c_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "head"));

        // line 6
        echo "    
    ";
        // line 7
        if (isset($context['assetic']['debug']) && $context['assetic']['debug']) {
            // asset "b392158_0"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_b392158_0") : $this->env->getExtension('asset')->getAssetUrl("css/b392158_koolawa_1.css");
            // line 14
            echo "        <link rel=\"stylesheet\" href=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\" />
    ";
            // asset "b392158_1"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_b392158_1") : $this->env->getExtension('asset')->getAssetUrl("css/b392158_icones_2.css");
            echo "        <link rel=\"stylesheet\" href=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\" />
    ";
            // asset "b392158_2"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_b392158_2") : $this->env->getExtension('asset')->getAssetUrl("css/b392158_part_3_cobalt_1.css");
            echo "        <link rel=\"stylesheet\" href=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\" />
    ";
            // asset "b392158_3"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_b392158_3") : $this->env->getExtension('asset')->getAssetUrl("css/b392158_part_3_codemirror_2.css");
            echo "        <link rel=\"stylesheet\" href=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\" />
    ";
            // asset "b392158_4"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_b392158_4") : $this->env->getExtension('asset')->getAssetUrl("css/b392158_part_4_toggleslide_1.css");
            echo "        <link rel=\"stylesheet\" href=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\" />
    ";
            // asset "b392158_5"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_b392158_5") : $this->env->getExtension('asset')->getAssetUrl("css/b392158_part_5_workspace_1.css");
            echo "        <link rel=\"stylesheet\" href=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\" />
    ";
            // asset "b392158_6"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_b392158_6") : $this->env->getExtension('asset')->getAssetUrl("css/b392158_part_6_workspace_administration_1.css");
            echo "        <link rel=\"stylesheet\" href=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\" />
    ";
            // asset "b392158_7"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_b392158_7") : $this->env->getExtension('asset')->getAssetUrl("css/b392158_part_6_workspace_agenda_2.css");
            echo "        <link rel=\"stylesheet\" href=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\" />
    ";
            // asset "b392158_8"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_b392158_8") : $this->env->getExtension('asset')->getAssetUrl("css/b392158_part_6_workspace_draw_3.css");
            echo "        <link rel=\"stylesheet\" href=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\" />
    ";
            // asset "b392158_9"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_b392158_9") : $this->env->getExtension('asset')->getAssetUrl("css/b392158_part_6_workspace_mail_4.css");
            echo "        <link rel=\"stylesheet\" href=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\" />
    ";
            // asset "b392158_10"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_b392158_10") : $this->env->getExtension('asset')->getAssetUrl("css/b392158_part_6_workspace_paint_5.css");
            echo "        <link rel=\"stylesheet\" href=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\" />
    ";
            // asset "b392158_11"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_b392158_11") : $this->env->getExtension('asset')->getAssetUrl("css/b392158_part_6_workspace_presentation_6.css");
            echo "        <link rel=\"stylesheet\" href=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\" />
    ";
            // asset "b392158_12"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_b392158_12") : $this->env->getExtension('asset')->getAssetUrl("css/b392158_part_6_workspace_project_7.css");
            echo "        <link rel=\"stylesheet\" href=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\" />
    ";
            // asset "b392158_13"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_b392158_13") : $this->env->getExtension('asset')->getAssetUrl("css/b392158_part_6_spreadsheet_8.css");
            echo "        <link rel=\"stylesheet\" href=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\" />
    ";
            // asset "b392158_14"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_b392158_14") : $this->env->getExtension('asset')->getAssetUrl("css/b392158_part_6_workspace_spreadsheet_9.css");
            echo "        <link rel=\"stylesheet\" href=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\" />
    ";
            // asset "b392158_15"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_b392158_15") : $this->env->getExtension('asset')->getAssetUrl("css/b392158_part_6_filetree_panel_10.css");
            echo "        <link rel=\"stylesheet\" href=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\" />
    ";
            // asset "b392158_16"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_b392158_16") : $this->env->getExtension('asset')->getAssetUrl("css/b392158_part_6_workspace_storage_11.css");
            echo "        <link rel=\"stylesheet\" href=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\" />
    ";
            // asset "b392158_17"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_b392158_17") : $this->env->getExtension('asset')->getAssetUrl("css/b392158_part_6_workspace_studio_12.css");
            echo "        <link rel=\"stylesheet\" href=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\" />
    ";
            // asset "b392158_18"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_b392158_18") : $this->env->getExtension('asset')->getAssetUrl("css/b392158_part_6_workspace_talk_13.css");
            echo "        <link rel=\"stylesheet\" href=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\" />
    ";
            // asset "b392158_19"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_b392158_19") : $this->env->getExtension('asset')->getAssetUrl("css/b392158_part_6_workspace_write_14.css");
            echo "        <link rel=\"stylesheet\" href=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\" />
    ";
            // asset "b392158_20"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_b392158_20") : $this->env->getExtension('asset')->getAssetUrl("css/b392158_part_6_write_15.css");
            echo "        <link rel=\"stylesheet\" href=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\" />
    ";
        } else {
            // asset "b392158"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_b392158") : $this->env->getExtension('asset')->getAssetUrl("css/b392158.css");
            echo "        <link rel=\"stylesheet\" href=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\" />
    ";
        }
        unset($context["asset_url"]);
        // line 16
        echo "    
    
    ";
        // line 18
        if (isset($context['assetic']['debug']) && $context['assetic']['debug']) {
            // asset "c20e225_0"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_0") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_global_1.js");
            // line 28
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_1"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_1") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_symfony_2.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_2"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_2") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_workspace_3.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_3"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_3") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_workspace_default_4.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_4"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_4") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_centerpanel_5.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_5"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_5") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_6_workspace_administration_1.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_6"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_6") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_6_workspace_agenda_2.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_7"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_7") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_6_panelk_3.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_8"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_8") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_6_ribbonmenu_4.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_9"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_9") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_6_workspace_controls_5.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_10"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_10") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_6_workspace_draw_6.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_11"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_11") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_6_workspace_mail_7.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_12"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_12") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_6_workspace_paint_8.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_13"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_13") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_6_workspace_presentation_9.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_14"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_14") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_6_workspace_project_10.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_15"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_15") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_6_spreadsheet_11.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_16"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_16") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_6_workspace_spreadsheet_12.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_17"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_17") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_6_com_13.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_18"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_18") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_6_filestree_panel_14.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_19"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_19") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_6_storage_15.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_20"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_20") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_6_workspace_storage_16.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_21"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_21") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_6_studio_17.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_22"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_22") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_6_workspace_studio_18.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_23"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_23") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_6_workspace_talk_19.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_24"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_24") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_6_workspace_write_20.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_25"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_25") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_6_write_21.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_26"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_26") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_7_codemirror_1.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_27"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_27") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_8_active-line_1.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_28"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_28") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_8_closebrackets_2.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_29"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_29") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_8_closetag_3.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_30"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_30") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_8_matchbrackets_4.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_31"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_31") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_8_matchtags_5.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_32"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_32") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_8_clike_6.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_33"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_33") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_8_css_7.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_34"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_34") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_8_htmlmixed_8.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_35"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_35") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_8_javascript_9.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_36"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_36") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_8_pascal_10.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_37"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_37") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_8_php_11.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_38"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_38") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_8_python_12.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_39"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_39") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_8_shell_13.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_40"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_40") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_8_spreadsheet_14.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_41"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_41") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_8_sql_15.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_42"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_42") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_8_vb_16.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_43"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_43") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_8_vbscript_17.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_44"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_44") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_8_xml_18.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_45"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_45") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_9_Thumb_1.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c20e225_46"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225_46") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225_part_9_ToggleSlide_2.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
        } else {
            // asset "c20e225"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c20e225") : $this->env->getExtension('asset')->getAssetUrl("js/c20e225.js");
            echo "        <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
        }
        unset($context["asset_url"]);
        // line 30
        echo "
    <script type=\"text/javascript\">
\t\tvar _workspace = '";
        // line 32
        echo twig_escape_filter($this->env, (isset($context["_workspace"]) ? $context["_workspace"] : $this->getContext($context, "_workspace")), "html", null, true);
        echo "';
\t\tvar _locale = '";
        // line 33
        echo twig_escape_filter($this->env, (isset($context["_locale"]) ? $context["_locale"] : $this->getContext($context, "_locale")), "html", null, true);
        echo "';
\t\tvar _script_name = '";
        // line 34
        echo twig_escape_filter($this->env, (isset($context["_script_name"]) ? $context["_script_name"] : $this->getContext($context, "_script_name")), "html", null, true);
        echo "';
\t\tvar _request_scheme = '";
        // line 35
        echo twig_escape_filter($this->env, (isset($context["_request_scheme"]) ? $context["_request_scheme"] : $this->getContext($context, "_request_scheme")), "html", null, true);
        echo "';
\t\tvar _http_host = '";
        // line 36
        echo twig_escape_filter($this->env, (isset($context["_http_host"]) ? $context["_http_host"] : $this->getContext($context, "_http_host")), "html", null, true);
        echo "';
\t</script>
    
";
        
        $__internal_af4fcee1e6c40db7aa545d8c1ff3367e36c4a74e53b16b92c34c738a02d7273c->leave($__internal_af4fcee1e6c40db7aa545d8c1ff3367e36c4a74e53b16b92c34c738a02d7273c_prof);

    }

    // line 42
    public function block_body($context, array $blocks = array())
    {
        $__internal_23f793573e5858d7018a7eb8afdf86e0dad5f8f8d384208c9afa558cf77eaa99 = $this->env->getExtension("native_profiler");
        $__internal_23f793573e5858d7018a7eb8afdf86e0dad5f8f8d384208c9afa558cf77eaa99->enter($__internal_23f793573e5858d7018a7eb8afdf86e0dad5f8f8d384208c9afa558cf77eaa99_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "body"));

        // line 43
        echo "    <input id=\"_error_message\" type=\"hidden\" value=\"";
        if ((isset($context["error"]) ? $context["error"] : $this->getContext($context, "error"))) {
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["error"]) ? $context["error"] : $this->getContext($context, "error")), "message", array()), "html", null, true);
        }
        echo "\" />
    <input id=\"_last_username\" type=\"hidden\" value=\"";
        // line 44
        echo twig_escape_filter($this->env, (isset($context["last_username"]) ? $context["last_username"] : $this->getContext($context, "last_username")), "html", null, true);
        echo "\" />
";
        
        $__internal_23f793573e5858d7018a7eb8afdf86e0dad5f8f8d384208c9afa558cf77eaa99->leave($__internal_23f793573e5858d7018a7eb8afdf86e0dad5f8f8d384208c9afa558cf77eaa99_prof);

    }

    public function getTemplateName()
    {
        return "KoolawaAppsBundle:Workspace:workspace.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  524 => 44,  517 => 43,  511 => 42,  500 => 36,  496 => 35,  492 => 34,  488 => 33,  484 => 32,  480 => 30,  190 => 28,  186 => 18,  182 => 16,  48 => 14,  44 => 7,  41 => 6,  35 => 5,  11 => 3,);
    }
}
/* {# src/T2SA/UserBundle/Resources/views/Security/login.html.twig #}*/
/* */
/* {% extends "KoolawaCoreBundle::layout.html.twig" %}*/
/* */
/* {% block head %}*/
/*     */
/*     {% stylesheets '@KoolawaAppsBundle/Resources/public/css/koolawa.css'*/
/*                    '@KoolawaAppsBundle/Resources/public/css/icones.css'*/
/*                    '@KoolawaAppsBundle/Resources/public/css/codemirror/*.css'*/
/*                    '@KoolawaAppsBundle/Resources/public/css/toggleslide/*.css'*/
/*                    '@KoolawaAppsBundle/Resources/public/css/workspace/*.css'*/
/*                    '@KoolawaAppsBundle/Resources/public/css/workspace/*//* *.css'*/
/*     filter='cssrewrite, yui_css' %}*/
/*         <link rel="stylesheet" href="{{ asset_url }}" />*/
/*     {% endstylesheets %}*/
/*     */
/*     */
/*     {% javascripts '@KoolawaAppsBundle/Resources/public/js/global.js'*/
/*                    '@KoolawaAppsBundle/Resources/public/js/symfony.js'*/
/*                    '@KoolawaAppsBundle/Resources/public/js/workspace/workspace.js'*/
/*                    '@KoolawaAppsBundle/Resources/public/js/workspace/workspace_default.js'*/
/*                    '@KoolawaAppsBundle/Resources/public/js/workspace/centerpanel.js'*/
/*                    '@KoolawaAppsBundle/Resources/public/js/workspace/*//* *.js'*/
/*                    '@KoolawaAppsBundle/Resources/public/js/codemirror/*.js'*/
/*                    '@KoolawaAppsBundle/Resources/public/js/codemirror/*//* *.js'*/
/*                    '@KoolawaAppsBundle/Resources/public/js/toggleslide/*.js'*/
/*     filter='' %}*/
/*         <script type="text/javascript" src="{{ asset_url }}"></script>*/
/*     {% endjavascripts %}*/
/* */
/*     <script type="text/javascript">*/
/* 		var _workspace = '{{ _workspace }}';*/
/* 		var _locale = '{{ _locale }}';*/
/* 		var _script_name = '{{ _script_name }}';*/
/* 		var _request_scheme = '{{ _request_scheme }}';*/
/* 		var _http_host = '{{ _http_host }}';*/
/* 	</script>*/
/*     */
/* {% endblock %}*/
/* */
/* */
/* {% block body %}*/
/*     <input id="_error_message" type="hidden" value="{% if error %}{{ error.message }}{% endif %}" />*/
/*     <input id="_last_username" type="hidden" value="{{ last_username }}" />*/
/* {% endblock %}*/
/* */
/* */
